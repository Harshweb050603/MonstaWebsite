import addressModel from "../Models/address.model.js";

// Save or Update Address
export const saveAddress = async (req, res) => {
  try {
    const { billingAddress, shippingAddress } = req.body;

    if (!billingAddress || !shippingAddress) {
      return res.status(400).json({
        success: false,
        message: "Billing and Shipping address are required",
      });
    }

    const address = await addressModel.findOneAndUpdate(
      { user: req.user.id },
      {
        user: req.user.id,
        billingAddress,
        shippingAddress,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      success: true,
      message: "Address saved successfully",
      address,
    });

  } catch (error) {
    console.error("Save Address Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


// Get User Address
export const getAddress = async (req, res) => {
  try {
    const address = await addressModel.findOne({
      user: req.user.id,
    });

    return res.status(200).json({
      success: true,
      message: "Address fetched successfully",
      address,
    });

  } catch (error) {
    console.error("Get Address Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};