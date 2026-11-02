import nodemailer from "nodemailer";
import config from "../config/config.js";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: config.GOOGLE_USER,
    clientId: config.GOOGLE_CLIENT_ID,
    clientSecret: config.GOOGLE_CLIENT_SECRET,
    refreshToken: config.GOOGLE_REFRESH_TOKEN,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error("Email server error:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

export const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: {
        name: "Your App Name",
        address: config.GOOGLE_USER,
      },
      to,
      subject,
      text,
      html,
    });

    console.log("Message sent:", info.messageId);
    console.log("Accepted recipients:", info.accepted);
    console.log("Rejected recipients:", info.rejected);

    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};