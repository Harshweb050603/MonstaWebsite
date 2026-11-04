
import { Link } from 'react-router-dom';
import api from "@/services/api";
import { toast } from "react-toastify";

export default function Card({ product, products, wishlistIds, onWishlistChange }) {

    const handleWishlistToggle = async () => {
        try {
            if (isWishlisted) {
                const response = await api.delete(
                    `/api/wishlist/remove/${product._id}`
                );

                toast.success(response.data.message);
            } else {
                const response = await api.post("/api/wishlist/add", {
                    productId: product._id
                });
                onWishlistChange(product._id, "add");
                toast.success(response.data.message);
            }

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );
        }
    };
    const handleAddToCart = async () => {
        try {
            const response = await api.post("/api/cart/add", {
                productId: product._id
            });
            window.dispatchEvent(new Event("cartUpdated"));
            toast.success(response.data.message);

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to add product to cart"
            );
        }
    };
    const isWishlisted = wishlistIds?.includes(product._id);
    return (

        <div className="card mb-5 pb-5">

            {/* Product Image */}
            <Link
                to={`/ProductDetails/${product._id}`}
                state={{ products }}
            >
                <div className="peoduct_img pb-2">
                    <img
                        src={`http://localhost:3000/uploads/${encodeURIComponent(product.image)}`}
                        alt={product.name}
                        className="w-full"
                    />
                </div>
            </Link>

            <div className="product_content">

                <div className="text-center p-2">
                    <p>{product.category}</p>
                </div>

                <h3 className="text-center">
                    <Link
                        to={`/ProductDetails/${product._id}`}
                        state={{ products }}
                        className="text-decoration-none text-reset"
                    >
                        {product.name}
                    </Link>
                </h3>

                <div className="price text-center">
                    <span className="line-through text-[20px] pr-2">
                        Rs. 3,000
                    </span>

                    <span className="text-[#C09578] font-bold text-[20px]">
                        {product.price}
                    </span>
                </div>

                <div className="action_links m-auto pt-2">
                    <ul className="flex gap-2 m-auto justify-center">

                        {/* Wishlist */}
                        <li className="p-2 bg-[#F1F1F1] hover:bg-[#C09578]">
                            <button
                                type="button"
                                onClick={handleWishlistToggle}
                            >
                                <i
                                    className={`text-[20px] ${isWishlisted
                                            ? "fa-solid fa-heart text-[#C09578] hover:text-black"
                                            : "fa-regular fa-heart"
                                        }`}
                                ></i>
                            </button>
                        </li>

                        {/* Add to Cart */}
                        <li className="p-2 bg-[#F1F1F1] hover:bg-[#C09578]">
                            <button
                                type="button"
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </button>
                        </li>

                    </ul>
                </div>

            </div>
        </div>
    );
}
