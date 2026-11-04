import cartModel from "../Models/cart.model.js";
import productModel from "../Models/product.model.js";


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check product exists or not
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Find user's cart
    let cart = await cartModel.findOne({
      user: req.user.id
    });

    // If cart does not exist, create new cart
    if (!cart) {
      cart = await cartModel.create({
        user: req.user.id,
        products: [
          {
            product: productId,
            quantity: 1
          }
        ]
      });
    } else {
      // Check product already exists in cart
      const existingProduct = cart.products.find(
        (item) => item.product.toString() === productId
      );

      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({
          product: productId,
          quantity: 1
        });
      }

      await cart.save();
    }

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
      cart
    });

  } catch (error) {
    console.error("Add to cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
export const getCart = async (req, res) => {
  try {
    const cart = await cartModel
      .findOne({ user: req.user.id })
      .populate("products.product");

    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart
    });

  } catch (error) {
    console.error("Get cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
export const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!Number.isInteger(quantity) || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1"
      });
    }

    const cart = await cartModel.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const cartProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (!cartProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart"
      });
    }

    cartProduct.quantity = quantity;

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Cart quantity updated successfully",
      cart
    });

  } catch (error) {
    console.error("Update cart quantity error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await cartModel.findOne({
      user: req.user.id
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found"
      });
    }

    const productExists = cart.products.some(
      (item) => item.product.toString() === productId
    );

    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found in cart"
      });
    }

    cart.products.pull({ product: productId });

    await cart.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from cart successfully",
      cart
    });

  } catch (error) {
    console.error("Remove from cart error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};