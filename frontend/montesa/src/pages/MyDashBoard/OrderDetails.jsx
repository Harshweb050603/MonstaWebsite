
function OrderDetails({ order, onBack }) {
  if (!order) {
    return <p className="py-10">Order details not found.</p>;
  }

  return (
    <div className="border border-gray-200 rounded-md p-6">

      <button
        onClick={onBack}
        className="mb-5 text-[#C09578] hover:underline"
      >
        ← Back to Orders
      </button>

      <h2 className="text-2xl font-semibold mb-6">
        Order Details
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">

        <div>
          <p className="text-gray-500 text-sm">Order ID</p>
          <p className="font-medium break-all">{order._id}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Order Date</p>
          <p className="font-medium">
            {new Date(order.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Order Status</p>
          <p className="text-[#C09578] font-medium">
            {order.orderStatus}
          </p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Payment Status</p>
          <p className="font-medium">{order.paymentStatus}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Payment Method</p>
          <p className="font-medium">{order.paymentMethod}</p>
        </div>

      </div>

      <div className="border-t pt-5">
        <h3 className="font-semibold text-lg mb-4">
          Products
        </h3>

        {order.products.map((item, index) => (
          <div
            key={item.product || index}
            className="flex justify-between items-center gap-4 mb-4 border-b pb-4"
          >
            <div className="flex items-center gap-4">

              {item.image && (
                <img
                  src={`http://localhost:3000/uploads/${encodeURIComponent(item.image)}`}
                  alt={item.name}
                  className="w-16 h-16 object-cover"
                />
              )}

              <div>
                <p className="font-medium">{item.name}</p>
                <p className="text-gray-500 text-sm">
                  ₹{item.price.toLocaleString("en-IN")} × {item.quantity}
                </p>
              </div>
            </div>

            <p className="font-medium">
              ₹{(item.price * item.quantity).toLocaleString("en-IN")}
            </p>
          </div>
        ))}

        <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg">
          <span>Total Amount</span>
          <span>₹{order.totalAmount.toLocaleString("en-IN")}</span>
        </div>
      </div>

      <div className="border-t mt-6 pt-5">
        <h3 className="font-semibold text-lg mb-4">
          Shipping Address
        </h3>

        <p>{order.shippingAddress.fullName}</p>
        <p>{order.shippingAddress.phone}</p>
        <p>{order.shippingAddress.address}</p>
        <p>
          {order.shippingAddress.city},{" "}
          {order.shippingAddress.state} -{" "}
          {order.shippingAddress.pincode}
        </p>
      </div>

    </div>
  );
}

export default OrderDetails;
