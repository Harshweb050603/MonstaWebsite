
import orderModel from "../Models/order.model.js";
import cartModel from "../Models/cart.model.js";

export const createOrder = async (req, res) => {
  try {
    // 1. Shipping address frontend se receive karo
    const {
      fullName,
      phone,
      address,
      city,
      state,
      pincode,
    } = req.body;

    // 2. Address validation
    if (
      !fullName ||
      !phone ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      return res.status(400).json({
        success: false,
        message: "All shipping address fields are required",
      });
    }

    // 3. User ki cart fetch karo
    const cart = await cartModel
      .findOne({ user: req.user.id })
      .populate("products.product");

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Your cart is empty",
      });
    }

    // 4. Products aur total amount calculate karo
    let totalAmount = 0;

    const orderProducts = cart.products.map((item) => {
      const product = item.product;

      if (!product) {
        throw new Error("Product is no longer available");
      }

      const price = Number(product.price);
      const quantity = item.quantity;

      if (!Number.isFinite(price) || price < 0) {
        throw new Error("Invalid product price");
      }

      totalAmount += price * quantity;

      return {
        product: product._id,
        name: product.name,
        image: product.image,
        price,
        quantity,
      };
    });

    // 5. Order save karo
    const order = await orderModel.create({
      user: req.user.id,
      products: orderProducts,

      shippingAddress: {
        fullName,
        phone,
        address,
        city,
        state,
        pincode,
      },

      totalAmount,
      paymentMethod: "COD",
      paymentStatus: "Pending",
      orderStatus: "Processing",
    });

    // 6. Cart empty karo
    cart.products = [];
    await cart.save();

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order,
    });

  } catch (error) {
    console.error("Create Order Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Internal server error",
    });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ user: req.user.id })
      .populate("products.product", "name image price")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });

  } catch (error) {
    console.error("Get My Orders Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
