function OrderDetails() {
  return (
    <div className="border border-gray-200 rounded-md p-6">

      <h2 className="text-2xl font-semibold mb-6">
        Order Details
      </h2>

      <div className="mb-5">
        <p className="text-gray-500 text-sm">Order ID</p>
        <p className="font-medium">#ORD-1001</p>
      </div>

      <div className="mb-5">
        <p className="text-gray-500 text-sm">Order Status</p>
        <p className="text-green-600 font-medium">Delivered</p>
      </div>

      <div className="border-t pt-5">
        <h3 className="font-semibold mb-4">Products</h3>

        <div className="flex justify-between mb-3">
          <span>Modern Sofa × 1</span>
          <span>₹25,000</span>
        </div>

        <div className="flex justify-between mb-3">
          <span>Wooden Dining Table × 2</span>
          <span>₹30,000</span>
        </div>

        <div className="border-t pt-4 mt-4 flex justify-between font-semibold">
          <span>Total Amount</span>
          <span>₹55,000</span>
        </div>
      </div>

    </div>
  );
}

export default OrderDetails;