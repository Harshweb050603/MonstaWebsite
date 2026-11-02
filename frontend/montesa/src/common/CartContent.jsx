import {Link} from 'react-router-dom'

export default function CartContent({ onClose, isDrawer = false }) {
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
  <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">

    <img
      src="/photos/Online Furniture in India/Shopping.jpg"
      alt="Shopping cart"
      className="w-full max-w-[260px] object-contain"
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

  {/* Footer - only in drawer */}
  {isDrawer && (
    <div className="p-5 border-t border-gray-200">
      <div className="flex justify-between mb-4">
        <span className="text-gray-600">Subtotal</span>
        <b>Rs. 0.00</b>
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
