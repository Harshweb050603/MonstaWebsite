
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import api from "@/services/api";

function Orders({ onView }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/api/orders/my-orders");
      setOrders(response.data.orders || []);
    } catch (error) {
      console.log("Fetch orders error:", error);
      toast.error(
        error.response?.data?.message || "Unable to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="border border-gray-200 rounded-md p-6">
      <h2 className="text-2xl font-semibold mb-6">
        My Orders
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[750px] text-left">
          <thead>
            <tr className="bg-gray-100 border-b">
              <th className="p-4">Order ID</th>
              <th className="p-4">Date</th>
              <th className="p-4">Product</th>
              <th className="p-4">Price</th>
              <th className="p-4">Qty</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="8" className="text-center py-10">
                  Loading orders...
                </td>
              </tr>
            ) : orders.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center py-10">
                  You have not placed any orders yet.
                </td>
              </tr>
            ) : (
              orders.map((order) => {
                const firstProduct = order.products[0];

                const statusClass =
                  order.orderStatus === "Delivered"
                    ? "bg-green-100 text-green-700"
                    : order.orderStatus === "Shipped"
                    ? "bg-blue-100 text-blue-700"
                    : order.orderStatus === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700";

                return (
                  <tr key={order._id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      #{order._id.slice(-8).toUpperCase()}
                    </td>

                    <td className="p-4">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="p-4">
                      {firstProduct?.name}
                      {order.products.length > 1 &&
                        ` + ${order.products.length - 1} more`}
                    </td>

                    <td className="p-4">
                      ₹{firstProduct?.price?.toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      {firstProduct?.quantity}
                    </td>

                    <td className="p-4 font-medium">
                      ₹{order.totalAmount?.toLocaleString("en-IN")}
                    </td>

                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-sm ${statusClass}`}>
                        {order.orderStatus}
                      </span>
                    </td>

                    <td className="p-4">
                      <button
                        onClick={() => onView(order)}
                        className="text-[#C09578] font-medium hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Orders;
