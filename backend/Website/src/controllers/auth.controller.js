import userModel from "../Models/user.model.js";
import crypto, { createHash } from "crypto";
import jwt from "jsonwebtoken";
import config from "../config/config.js";
import sessionModel from "../Models/session.model.js";
import { sendEmail } from "../services/email.services.js";
import otpModel from "../Models/otp.model.js";
import { generateOtp, getOtpHTML } from "../utils/utils.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isAlreadyRegistered = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isAlreadyRegistered) {
      return res.status(400).json({
        message: "Username or email already exists",
      });
    }

    const hashPassword = crypto
      .createHash("sha256")
      .update(password)
      .digest("hex");

    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const otp = generateOtp();
    const html = getOtpHTML(otp);
    const otpHash = crypto.createHash("sha256").update(otp.toString()).digest("hex");
    
    await otpModel.create({
      email,
      otpHash,
      user: user._id,
    });

    await sendEmail(email, "Your OTP Code", `Your OTP code is: ${otp}`, html);


    res.status(201).json({
      message: "User registered successfully",
      user: {
        username: user.username,
        email: user.email,
        verified: user.verified
      }
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
}
export async function login(req, res) {
  const { email, password } = req.body


  const user = await userModel.findOne({
    email
  })

  if (!user) {
    return res.status(400).json({
      message: "invalid email or password"
    })
  }

  if(!user.verified){
    return res.status(400).json({
      message: "user is not verified"
    })
  }

  const hashPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");


  const isvalidPassword = hashPassword === user.password

  if (!isvalidPassword) {
    return res.status(400).json({
      message: "invalid password"
    })
  }

  const refreshToken = jwt.sign(
    { id: user._id },
    config.JWT_SECRET,
    { expiresIn: "7d" }
  );


  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex");

  const session = await sessionModel.create({
    user: user._id,
    refreshToken:refreshTokenHash,
    ip: req.ip,
    userAgent: req.headers["user-agent"]
  });
  const accessToken = jwt.sign(
    {
      id: user._id,
      sessionId: session._id
    },
    config.JWT_SECRET,
    { expiresIn: "15min" }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
    maxAge: 7 * 24 * 60 * 60 * 1000
  })

  res.status(200).json({
    message: "login successfully",
    users: {
      username: user.username,
      email: user.email
    },
    accessToken
  })


}
export async function getMe(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access token not found"
      });
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);

    const user = await userModel.findById(decoded.id)
      .select("username email verified");

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired access token"
    });
  }
}
export async function refreshToken(req, res) {
   console.log("Cookies:", req.cookies);
    console.log("Refresh Token:", req.cookies.refreshToken);
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found"
      });
    }

    // Verify refresh token
    const decoded = jwt.verify(
      refreshToken,
      config.JWT_SECRET
    );

    // Hash refresh token
    const refreshTokenHash = crypto
      .createHash("sha256")
      .update(refreshToken)
      .digest("hex");

    // Find active session
    const session = await sessionModel.findOne({
      user: decoded.id,
      refreshToken: refreshTokenHash,
      revoked: false
    });

    if (!session) {
      return res.status(401).json({
        message: "Invalid refresh token"
      });
    }

    // Generate new access token
    const accessToken = jwt.sign(
      {
        id: decoded.id,
        sessionId: session._id
      },
      config.JWT_SECRET,
      { expiresIn: "15min" }
    );

    // Generate new refresh token
    const newRefreshToken = jwt.sign(
      { id: decoded.id },
      config.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Hash new refresh token
    const newRefreshTokenHash = crypto
      .createHash("sha256")
      .update(newRefreshToken)
      .digest("hex");

    // Update existing session
    session.refreshToken = newRefreshTokenHash;
    await session.save();

    // Set new refresh token cookie
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
      message: " new Access token generated successfully",
      accessToken
    });

  } catch (error) {
    console.log("Refresh Token Error:", error);

    return res.status(401).json({
      message: "Invalid or expired refresh token"
    });
  }
}
export async function logout(req, res) {
  const refreshToken = req.cookies.refreshToken

  if (!refreshToken) {
    return res.status(400).json({
      message: "refresh Token not found "
    })
  }
  const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

  const session = await sessionModel.findOne({
    refreshToken: refreshTokenHash,
    revoked: false
  })
  if (!session) {
    return res.status(400).json({
      message: "revoked is true"
    })
  }
  session.revoked = true;

  await session.save();

  res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: true,
  sameSite: "Strict",
  maxAge: 7 * 24 * 60 * 60 * 1000
});

  res.status(200).json({
    message: "Log out successfully"
  })
}
export async function logoutAll(req, res) {
  const refreshToken = req.cookies.refreshToken
  if (!refreshToken) {
    return res.status(400).json({
      message: "token not found"
    })
  }
  const decoded = jwt.verify(refreshToken, config.JWT_SECRET)
  const session = await sessionModel.updateMany({
    user: decoded.id,
    revoked: false
  }, {
    revoked: true
  })
  res.clearCookie("refreshToken", {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
  path: "/",
});
  res.status(200).json({
    message: "log out from all devices sucessfully"
  });
}
export async function verifyOtp(req, res) {
  const { email, otp } = req.body;

  const otpHash = crypto.createHash("sha256").update(otp.toString()).digest("hex");

  const otpRecord = await otpModel.findOne({
    email,
    otpHash
  });

  if (!otpRecord) {
    return res.status(400).json({
      message: "Invalid OTP"
    });
  }

  const user = await userModel.findByIdAndUpdate(otpRecord.user, { verified: true }, { new: true });

  


  await otpModel.deleteMany({
    user: otpRecord.user
   });
  


  res.status(200).json({
    message: "OTP verified successfully",
    user:{
      username: user.username,
      email: user.email,
      verified: user.verified
    }
  });
}
export async function resendOtp(req,res){

  try{
      const {email} =req.body

    const user = await userModel.findOne({
      email
    })

    if(!user){
      return res.status(400).json({
        message:'user not found '
      })
    }

    if(user.verified){
      return res.status(401).json({
        message:'email is alredy verified'
      })
    }

    const otp = generateOtp();

    const otpHash = crypto.createHash('sha256').update(otp.toString()).digest("hex");

    await otpModel.deleteMany({user:user._id});

    await otpModel.create({
      email,
      otpHash,
      user:user._id
    })

    const html = getOtpHTML(otp);
     await sendEmail(
            email,
            "Your New OTP Code",
            `Your new OTP code is: ${otp}`,
            html
        );

           return res.status(200).json({
            message: "New OTP sent successfully"
        });
  }catch(error){
     console.log("Resend OTP Error:", error);

    return res.status(500).json({
            message: "Internal server error"
        });
  }
    




}

export async function updateProfile(req, res) {
  try {
    const { username, email } = req.body;

    if (!username?.trim() || !email?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Username and email are required",
      });
    }

    // Check whether another user already uses this username or email
    const existingUser = await userModel.findOne({
      _id: { $ne: req.user.id },
      $or: [
        { username: username.trim() },
        { email: email.trim() },
      ],
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      {
        username: username.trim(),
        email: email.trim(),
      },
      {
        new: true,
        runValidators: true,
      }
    ).select("username email verified");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });

  } catch (error) {
    console.error("Update Profile Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
