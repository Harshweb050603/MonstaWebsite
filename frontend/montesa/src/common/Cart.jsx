import api from "@/services/api";
import { useEffect, useState } from 'react'
import { toast } from "react-toastify";
import CommonHeading from '../common/CommonHeading'
import Footer from './Footer'
import Header from './Header.jsx'
import { useNavigate } from "react-router-dom";
export default function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const fetchCart = async () => {
        try {
            const response = await api.get("/api/cart");
            setCart(response.data.cart);
        } catch (error) {
            console.log("Cart fetch error:", error);
            toast.error("Unable to fetch cart");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchCart();
    }, []);

    const cartProducts = cart?.products || [];
    const subtotal = cartProducts.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const totalItems = cartProducts.reduce((total, item) => {
        return total + item.quantity;
    }, 0);
    const handleQuantityChange = async (productId, newQuantity) => {
        if (newQuantity < 1) return;

        try {
            const response = await api.put("/api/cart/update", {
                productId,
                quantity: newQuantity
            });

            toast.success(response.data.message);

            await fetchCart();

            window.dispatchEvent(new Event("cartUpdated"));

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to update quantity"
            );
        }
    };
    const handleRemoveFromCart = async (productId) => {
        try {
            const response = await api.delete(
                `/api/cart/remove/${productId}`
            );

            toast.success(response.data.message);

            await fetchCart();

            window.dispatchEvent(new Event("cartUpdated"));

        } catch (error) {
            toast.error(
                error.response?.data?.message || "Unable to remove product"
            );
        }
    };
    return (
        <>
            <Header />
            <CommonHeading
                title={'Shopping Cart'}
                pageName={'Shopping Cart'}
            />

            <div className="container mx-auto py-10">

                {/* Cart Products Table */}
                <div className="w-full min-w-[750px] overflow-x-auto">

                    <table className="w-full    text-left border-collapse">

                        <thead>
                            <tr className="border-b border-gray-300 text-gray-600">
                                <th className="py-5">Image</th>
                                <th className="py-5">Product</th>
                                <th className="py-5">Price</th>
                                <th className="py-5">Quantity</th>
                                <th className="py-5">Subtotal</th>
                                <th className="py-5">Remove</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-10">
                                        Loading cart...
                                    </td>
                                </tr>
                            ) : cartProducts.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-10">
                                        Your cart is empty.
                                    </td>
                                </tr>
                            ) : (
                                cartProducts.map((item) => (
                                    <tr
                                        key={item.product._id}
                                        className="border-b border-gray-200"
                                    >
                                        <td className="py-5">
                                            <img
                                                src={`http://localhost:3000/uploads/${encodeURIComponent(item.product.image)}`}
                                                alt={item.product.name}
                                                className="w-20 h-20 object-cover"
                                            />
                                        </td>

                                        <td className="py-5 font-medium">
                                            {item.product.name}
                                        </td>

                                        <td className="py-5">
                                            ₹ {item.product.price}
                                        </td>

                                        <td className="py-5">
                                            <div className="flex items-center border w-fit">
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.product._id,
                                                            item.quantity - 1
                                                        )
                                                    }
                                                    disabled={item.quantity === 1}
                                                    className="px-3 py-2 disabled:opacity-40 cursor-pointer hover:bg-[#C09578] hover:text-white transition"
                                                >
                                                    −
                                                </button>

                                                <span className="px-3">
                                                    {item.quantity}
                                                </span>

                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        handleQuantityChange(
                                                            item.product._id,
                                                            item.quantity + 1
                                                        )
                                                    }
                                                    className="px-3 py-2 cursor-pointer hover:bg-[#C09578] hover:text-white transition"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>

                                        <td className="py-5 font-semibold">
                                            ₹ {item.product.price * item.quantity}
                                        </td>

                                        <td className="py-5 px-4">
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFromCart(item.product._id)}
                                                className="text-gray-500 text-xl hover:text-red-500 transition cursor-pointer"
                                            >
                                                <i className="fa-solid fa-trash"></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>

                </div>
                {/* Cart Summary */}
                <div className="flex justify-center md:justify-end mt-10">

                    <div className="w-full md:w-[400px] border border-gray-200 p-6">

                        <h2 className="text-2xl font-semibold font-serif mb-6">
                            Cart Summary
                        </h2>
                        <div className="flex justify-between py-3 border-b">
                            <span className="text-gray-600">Total Items</span>
                            <span className="font-semibold">{totalItems}</span>
                        </div>

                        <div className="flex justify-between py-4 border-b">
                            <span className="font-semibold">SubTotal</span>
                            <span className="font-semibold">
                                ₹ {subtotal.toLocaleString("en-IN")}
                            </span>

                        </div>

                        <div className="flex justify-between py-4 border-b">
                            <span className="text-gray-600">Shipping</span>
                            <span className="text-green-600">Free</span>
                        </div>

                        <div className="flex justify-between py-5">
                            <span className="font-semibold text-lg">Total</span>
                            <span className="font-bold text-xl text-[#C09578]">
                                ₹ {subtotal.toLocaleString("en-IN")}
                            </span>
                        </div>

                        <button
                            onClick={() => navigate("/Checkout")}
                            disabled={loading || cartProducts.length === 0}
                            className="w-full bg-[#C09578] text-white py-4 mt-3 hover:bg-black transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Proceed to Checkout
                        </button>

                    </div>

                </div>
            </div>
            <Footer />
        </>
    )
}
