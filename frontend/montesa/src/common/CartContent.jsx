import { Link } from 'react-router-dom'
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import api from "@/services/api";
export default function CartContent({ onClose, isDrawer = false }) {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCart = async () => {
    try {
      const response = await api.get("/api/cart");
      setCart(response.data.cart);
    } catch (error) {
      console.log("Cart fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {

    fetchCart();

  }, []);

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

  const cartProducts = cart?.products || [];

  const subtotal = cartProducts.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const totalItems = cartProducts.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
  return (
    <>
      <div className="flex flex-col h-full bg-white">

        {/* Cart Header */}
        {isDrawer && (
          <div className="flex justify-between items-center p-5 border-b border-gray-200">
            <h2 className="text-xl font-semibold">Shopping Cart</h2>

            <button
              onClick={onClose}
              className="text-3xl leading-none hover:text-[#C09578]"
              aria-label="Close cart"
            >
              &times;
            </button>
          </div>
        )}

        {/* Cart Body */}
        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-5">

          {loading ? (
            <p className="text-center text-gray-500 mt-10">
              Loading cart...
            </p>
          ) : cartProducts.length === 0 ? (

            /* Empty Cart */
            <div className="flex flex-col items-center justify-center text-center h-full">

              <img
                src="/photos/Online Furniture in India/Shopping.jpg"
                alt="Shopping cart"
                className="w-full max-w-[220px] object-contain"
              />

              <h3 className="text-lg font-semibold mt-5">
                Your cart is currently empty
              </h3>

              <p className="text-gray-500 mt-2">
                Looks like you haven't added anything to your cart yet.
              </p>

              <Link
                to="/"
                onClick={onClose}
                className="mt-6 inline-block bg-[#C09578] text-white px-6 py-3 hover:bg-black transition"
              >
                Continue Shopping
              </Link>

            </div>

          ) : (

            /* Cart Products */
            <div className="space-y-5">

              {cartProducts.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-4 border-b border-gray-200 pb-5"
                >

                  <img
                    src={`http://localhost:3000/uploads/${encodeURIComponent(item.product.image)}`}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover"
                  />

                  <div className="flex-1">

                    <h3 className="font-semibold">
                      {item.product.name}
                    </h3>

                    <p className="text-[#C09578] font-semibold mt-1">
                      ₹ {item.product.price}
                    </p>

                    <div className="flex items-center gap-3 mt-2">
                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.product._id, item.quantity - 1)
                        }
                        disabled={item.quantity === 1}
                        className="w-7 h-7 border rounded hover:bg-[#C09578] hover:text-white disabled:opacity-40"
                      >
                        -
                      </button>

                      <span>{item.quantity}</span>

                      <button
                        type="button"
                        onClick={() =>
                          handleQuantityChange(item.product._id, item.quantity + 1)
                        }
                        className="w-7 h-7 border rounded hover:bg-[#C09578] hover:text-white"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFromCart(item.product._id)}
                      className="text-sm text-red-500 hover:text-red-700 mt-2"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="font-semibold">
                    ₹ {item.product.price * item.quantity}
                  </div>

                </div>
              ))}

            </div>

          )}

        </div>

        {/* Footer - only in drawer */}
        {isDrawer && (
          <div className="p-5 border-t border-gray-200">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Total Items</span>
              <b>{totalItems}</b>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-gray-600">Subtotal</span>
              <b>₹ {subtotal.toLocaleString("en-IN")}</b>
            </div>

            <Link
              to="/cart"
              onClick={onClose}
              className="block text-center border border-[#C09578] text-[#C09578] py-3 mb-3 hover:bg-[#C09578] hover:text-white transition"
            >
              View Cart
            </Link>

            <button
              disabled
              className="w-full bg-gray-300 text-gray-600 py-3 cursor-not-allowed"
            >
              Checkout
            </button>
          </div>
        )}

      </div>
    </>
  )
}
