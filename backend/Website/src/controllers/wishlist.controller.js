import wishlistModel from "../Models/wishlist.model.js";
import productModel from "../Models/product.model.js";


export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;

    // Check product exists
    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Find user's wishlist
    let wishlist = await wishlistModel.findOne({
      user: req.user.id
    });

    // Create wishlist if it doesn't exist
    if (!wishlist) {
      wishlist = await wishlistModel.create({
        user: req.user.id,
        products: [productId]
      });
    } else {
      wishlist.products.addToSet(productId);
      await wishlist.save();
    }

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      wishlist
    });

  } catch (error) {
    console.error("Add wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const wishlist = await wishlistModel
      .findOne({ user: req.user.id })
      .populate("products");

    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully",
      wishlist
    });

  } catch (error) {
    console.error("Get wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await wishlistModel.findOne({
      user: req.user.id
    });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: "Wishlist not found"
      });
    }

    wishlist.products.pull(productId);

    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product removed from wishlist",
      wishlist
    });

  } catch (error) {
    console.error("Remove wishlist error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};