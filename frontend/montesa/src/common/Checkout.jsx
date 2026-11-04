
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "@/services/api";
import Header from "./Header";
import Footer from "./Footer";
import CommonHeading from "../common/CommonHeading";

export default function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [placedOrder, setPlacedOrder] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const fetchCart = async () => {
    try {
      const response = await api.get("/api/cart");
      setCart(response.data.cart);
    } catch (error) {
      toast.error("Unable to fetch cart");
    } finally {
      setLoading(false);
    }
  };
    const fetchSavedAddress = async () => {
  try {
    const response = await api.get("/api/address");

    const savedAddress = response.data.address?.shippingAddress;

    if (savedAddress) {
      setFormData({
        fullName: savedAddress.fullName || "",
        phone: savedAddress.phone || "",
        address: savedAddress.address || "",
        city: savedAddress.city || "",
        state: savedAddress.state || "",
        pincode: savedAddress.pincode || "",
      });
    }

  } catch (error) {
    console.log("Saved Address Error:", error);
  }
};
  useEffect(() => {
    fetchCart();
    fetchSavedAddress();
  }, []);

  const cartProducts = cart?.products || [];

  const subtotal = cartProducts.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (cartProducts.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    try {
      setPlacingOrder(true);

      const response = await api.post("/api/orders", formData);

      setPlacedOrder(response.data.order);

      window.dispatchEvent(new Event("cartUpdated"));

      toast.success("Order placed successfully!");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Unable to place order"
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  if (loading) {
    return <p className="text-center py-20">Loading checkout...</p>;
  }

  if (placedOrder) {
    return (
      <>
        <Header />

        <div className="container mx-auto py-20 px-4 text-center">
          <div className="text-green-600 text-5xl mb-5">
            <i className="fa-solid fa-circle-check"></i>
          </div>

          <h1 className="text-3xl font-semibold mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-3">
            Thank you for shopping with us.
          </p>

          <p className="mb-6">
            Order ID: {placedOrder._id}
          </p>

          <button
            onClick={() => navigate("/")}
            className="bg-[#C09578] text-white px-8 py-3 hover:bg-black transition"
          >
            Continue Shopping
          </button>
        </div>

        <Footer />
      </>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <>
        <Header />
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-5">
            Your cart is empty
          </h2>

          <button
            onClick={() => navigate("/Cart")}
            className="bg-[#C09578] text-white px-6 py-3"
          >
            Go to Cart
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <CommonHeading
        title="Checkout"
        pageName="Checkout"
      />

      <div className="container mx-auto px-4 py-12">

        <form
          onSubmit={handlePlaceOrder}
          className="grid grid-cols-1 lg:grid-cols-2 gap-10"
        >

          {/* Shipping Address */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Shipping Address
            </h2>

            <div className="space-y-5">

              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full border p-3 outline-none"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full border p-3 outline-none"
              />

              <textarea
                name="address"
                placeholder="Full Address"
                value={formData.address}
                onChange={handleChange}
                required
                rows="3"
                className="w-full border p-3 outline-none"
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full border p-3 outline-none"
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full border p-3 outline-none"
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleChange}
                required
                className="w-full border p-3 outline-none"
              />

            </div>
          </div>

          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">
              Your Order
            </h2>

            <div className="border p-6">

              {cartProducts.map((item) => (
                <div
                  key={item.product._id}
                  className="flex justify-between gap-4 py-4 border-b"
                >
                  <div>
                    <p className="font-medium">
                      {item.product.name}
                    </p>

                    <p className="text-gray-500 text-sm">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold">
                    ₹{(
                      item.product.price * item.quantity
                    ).toLocaleString("en-IN")}
                  </p>
                </div>
              ))}

              <div className="flex justify-between py-4">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between py-4 border-b">
                <span>Shipping</span>
                <span className="text-green-600">Free</span>
              </div>

              <div className="flex justify-between py-5 text-lg font-bold">
                <span>Total</span>
                <span className="text-[#C09578]">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>

              <div className="border p-4 my-4">
                <label className="flex items-center gap-3">
                  <input
                    type="radio"
                    checked
                    readOnly
                  />
                  Cash on Delivery (COD)
                </label>
              </div>

              <button
                type="submit"
                disabled={placingOrder}
                className="w-full bg-[#C09578] text-white py-4 hover:bg-black transition disabled:opacity-50"
              >
                {placingOrder
                  ? "Placing Order..."
                  : "Place Order"}
              </button>

            </div>
          </div>

        </form>
      </div>

      <Footer />
    </>
  );
}
