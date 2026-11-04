
import logo from "../../public/photos/Online Furniture in India/logo.png";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import CartContent from '../common/CartContent.jsx';
import { useAuth } from "@/Context/AuthContext";
import api from "@/services/api";

export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const { user, isAuthenticated, logout: clearAuth } = useAuth();
    const [openMobileDropdown, setOpenMobileDropdown] = useState("");
    const [cartData, setCartData] = useState({
        totalItems: 0,
        subtotal: 0
    });

    const fetchCartSummary = async () => {
        try {
            const response = await api.get("/api/cart");

            const products = response.data.cart?.products || [];

            const totalItems = products.reduce(
                (total, item) => total + item.quantity,
                0
            );

            const subtotal = products.reduce(
                (total, item) => total + item.product.price * item.quantity,
                0
            );

            setCartData({ totalItems, subtotal });

        } catch (error) {
            console.log("Header cart error:", error);
        }
    };

  useEffect(() => {
  if (!isAuthenticated) {
    setCartData({ totalItems: 0, subtotal: 0 });
    return;
  }

  fetchCartSummary();

  const handleCartUpdated = () => {
    fetchCartSummary();
  };

  window.addEventListener("cartUpdated", handleCartUpdated);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdated);
  };
}, [isAuthenticated]);
    const handleLogout = async () => {
        try {
            const response = await api.post("/api/auth/logout");

            console.log(response.data.message);

            clearAuth();

        } catch (error) {
            console.log("Logout failed:", error);
        }
    };
    return (
        <>
            {/* contact info */}
            <div className='border border-[#EBEBEB]'>
                <div className='container m-auto'>
                    <div className='flex justify-center sm:justify-between p-2 text-xs sm:text-sm'>
                        <span className="hidden sm:block">Contact us 24/7 : +91-98745612330 / furniture@gmail.com</span>
                        <span className="relative group cursor-pointer">
                            {isAuthenticated ? (
                                <>
                                    <span className="hover:text-[#C09578]">
                                        My Account ▾
                                    </span>

                                    <div className="absolute right-0 top-full hidden group-hover:block
  bg-white shadow-lg border border-gray-200
  w-48 z-[9999]">
                                        <p className="px-4 py-3 border-b hover:text-[#C09578]">
                                            Hello, {user?.username}
                                        </p>

                                        <Link
                                            to="/MyDashBoard"
                                            className="block px-4 py-3 hover:bg-gray-100 hover:text-[#C09578]"
                                        >
                                            My Profile
                                        </Link>

                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-3 hover:bg-gray-100 hover:text-[#C09578]"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <Link to="/Login" className="hover:text-[#C09578]">
                                    Login / Register
                                </Link>
                            )}
                        </span>
                    </div>
                </div>
            </div>
            {/* logo section */}
            <div className='logo-search section'>
                <div className="container mx-auto px-3 sm:px-5 lg:p-6 flex items-center justify-between gap-2">
                    <div className='left-section'>
                        <img src={logo} alt="logo" className="w-24 sm:w-32 lg:w-[150px]" />
                    </div>

                    <div className='right-section flex justify-between align-items'>
                        <div className=' hidden md:flex items-center border border-[#EBEBEB] px-2 rounded'>
                            <input
                                type="text"
                                placeholder='Search product...'
                                className='text-gray outline-none' />

                            <span><i className="fa-solid fa-magnifying-glass hover:text-[#C09578] cursor-pointer"></i>
                            </span>
                        </div>
                        <Link to={'/MywishList'} className='flex items-center align-items'>
                            <div className='whishlist flex ml-4 items-center align-items border border-[#EBEBEB] py-4 px-4 rounded'>
                                <i className="fa-solid fa-heart hover:text-[#C09578] cursor-pointer"></i>
                            </div>
                        </Link>

                        <div className='cart-count hover:text-[#C09578] cursor-pointer flex align-items items-center ml-4 relative '>

                            <div
                                onClick={() => setIsCartOpen(true)}
                                className="cart-count hover:text-[#C09578] cursor-pointer flex items-center p-3 border border-[#EBEBEB] rounded"
                            >
                                <div className="count absolute left-[-9px] top-[13px] bg-[#C09578] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    {cartData.totalItems}
                                </div>

                                <i className="fa-solid fa-cart-shopping mr-2"></i>

                                <span className="mx-2">|</span>

                                <b>₹ {cartData.subtotal.toLocaleString("en-IN")}</b>

                            </div>

                            {/* Cart Sidebar */}

                            <div
                                className={`fixed inset-0 z-[9999] ${isCartOpen ? 'visible' : 'invisible'
                                    }`}
                            >
                                {/* Background Overlay */}
                                <div
                                    onClick={() => {
                                        fetchCartSummary();
                                        setIsCartOpen(true);
                                    }}
                                    className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${isCartOpen ? 'opacity-100' : 'opacity-0'
                                        }`}
                                ></div>

                                {/* Right Sidebar */}

                                <div
                                    className={`absolute top-0 right-0 h-full w-full sm:w-[420px] bg-white shadow-2xl transition-transform duration-300 ease-in-out ${isCartOpen ? 'translate-x-0' : 'translate-x-full'
                                        }`}
                                >
                                    <CartContent
                                        isDrawer={true}
                                        onClose={() => setIsCartOpen(false)}
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            {/* navbar section  */}



            <div className="navbar-section border border-[#EBEBEB] sticky top-0 bg-white z-50 py-5">
                <div className="container mx-auto px-3 sm:px-5 lg:px-6">

                    {/* Mobile Navbar */}
                    <div className="flex justify-between items-center py-3 lg:hidden">
                        <span className="font-semibold text-sm">MENU</span>

                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-2xl p-2 hover:text-[#C09578]"
                            aria-label="Toggle navigation"
                        >
                            <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
                        </button>
                    </div>

                    {/* Desktop Navbar */}
                    <ul className="hidden lg:flex justify-center items-center gap-8 xl:gap-10 font-semibold cursor-pointer">

                        <li className="active-menu hover:text-[#C09578]">
                            <Link to="/">Home</Link>
                        </li>

                        {/* Category Root */}
                        <li className="relative group hover:text-[#C09578]">
                            CATEGORY ROOT

                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] p-4 bg-white text-black invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-gray-200 shadow-lg">
                                Test
                            </div>
                        </li>

                        {/* Living */}
                        <li className="relative group hover:text-[#C09578]">
                            LIVING

                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] p-5 bg-white text-black invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-between gap-5 border border-gray-200 shadow-lg">

                                <div>
                                    <h1 className="font-semibold">Tables</h1>
                                    <ul className="text-gray-500 pt-5">
                                        <li>Side and tables</li>
                                    </ul>
                                </div>

                                <div>
                                    <h1>Mirror</h1>
                                </div>

                                <div>
                                    <h1>Living storage/Collection</h1>
                                </div>

                            </div>
                        </li>

                        {/* Sofa */}
                        <li className="relative group hover:text-[#C09578]">
                            SOFA

                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] p-5 bg-white text-black invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex justify-between gap-5 border border-gray-200 shadow-lg">

                                <div>
                                    <h1 className="font-semibold">Tables</h1>
                                    <ul className="text-gray-500 pt-5">
                                        <li>Side and tables</li>
                                    </ul>
                                </div>

                                <div>
                                    <h1>Mirror</h1>
                                </div>

                                <div>
                                    <h1>Living storage/Collection</h1>
                                </div>

                            </div>
                        </li>

                        {/* Pages */}
                        <li className="relative group hover:text-[#C09578]">
                            PAGES

                            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[220px] p-4 bg-white invisible opacity-0 translate-y-2 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 border border-gray-200 shadow-lg">

                                <ul className="text-[#808080] font-normal">
                                    <li className="pb-3 hover:text-[#C09578]">
                                        <Link to="/Aboutus">About us</Link>
                                    </li>
                                    <li className="pb-3 hover:text-[#C09578]">
                                        <Link to="/">CheckOut</Link>
                                    </li>
                                    <li className="pb-3 hover:text-[#C09578]">
                                        <Link to="/Cart">Cart</Link>
                                    </li>
                                    <li className="hover:text-[#C09578]">
                                        <Link to="/Frequently_questions">Frequently Questions</Link>
                                    </li>
                                </ul>

                            </div>
                        </li>

                        <li className="hover:text-[#C09578]">
                            <Link to="/Contactus">Contact Us</Link>
                        </li>

                    </ul>

                    {/* Mobile Menu */}
                    {isMobileMenuOpen && (
                        <ul className="lg:hidden flex flex-col border-t border-gray-200 py-3 font-semibold">

                            <li className="py-3 border-b border-gray-100 hover:text-[#C09578]">
                                <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                    Home
                                </Link>
                            </li>

                            {/* Category Root */}
                            <li className="py-3 border-b border-gray-100">
                                <button
                                    className="w-full flex justify-between items-center hover:text-[#C09578]"
                                    onClick={() => setOpenMobileDropdown(openMobileDropdown === "category" ? "" : "category")}
                                >
                                    CATEGORY ROOT
                                    <i className={`fa-solid ${openMobileDropdown === "category" ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                </button>

                                {openMobileDropdown === "category" && (
                                    <div className="pl-4 pt-3 text-sm text-gray-500">
                                        <p>Test</p>
                                    </div>
                                )}
                            </li>

                            {/* Living */}
                            <li className="py-3 border-b border-gray-100">
                                <button
                                    className="w-full flex justify-between items-center hover:text-[#C09578]"
                                    onClick={() => setOpenMobileDropdown(openMobileDropdown === "living" ? "" : "living")}
                                >
                                    LIVING
                                    <i className={`fa-solid ${openMobileDropdown === "living" ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                </button>

                                {openMobileDropdown === "living" && (
                                    <div className="pl-4 pt-3 text-sm text-gray-500 space-y-3">
                                        <p>Tables</p>
                                        <p>Side and tables</p>
                                        <p>Mirror</p>
                                        <p>Living storage/Collection</p>
                                    </div>
                                )}
                            </li>

                            {/* Sofa */}
                            <li className="py-3 border-b border-gray-100">
                                <button
                                    className="w-full flex justify-between items-center hover:text-[#C09578]"
                                    onClick={() => setOpenMobileDropdown(openMobileDropdown === "sofa" ? "" : "sofa")}
                                >
                                    SOFA
                                    <i className={`fa-solid ${openMobileDropdown === "sofa" ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                </button>

                                {openMobileDropdown === "sofa" && (
                                    <div className="pl-4 pt-3 text-sm text-gray-500 space-y-3">
                                        <p>Tables</p>
                                        <p>Side and tables</p>
                                        <p>Mirror</p>
                                        <p>Living storage/Collection</p>
                                    </div>
                                )}
                            </li>

                            {/* Pages */}
                            <li className="py-3 border-b border-gray-100">
                                <button
                                    className="w-full flex justify-between items-center hover:text-[#C09578]"
                                    onClick={() => setOpenMobileDropdown(openMobileDropdown === "pages" ? "" : "pages")}
                                >
                                    PAGES
                                    <i className={`fa-solid ${openMobileDropdown === "pages" ? "fa-chevron-up" : "fa-chevron-down"}`}></i>
                                </button>

                                {openMobileDropdown === "pages" && (
                                    <div className="pl-4 pt-3 text-sm text-gray-500 space-y-3">
                                        <p>
                                            <Link to="/Aboutus" onClick={() => setIsMobileMenuOpen(false)}>
                                                About us
                                            </Link>
                                        </p>
                                        <p>
                                            <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>
                                                CheckOut
                                            </Link>
                                        </p>
                                        <p>
                                            <Link to="/Cart" onClick={() => setIsMobileMenuOpen(false)}>
                                                Cart
                                            </Link>
                                        </p>
                                        <p>
                                            <Link to="/Frequently_questions" onClick={() => setIsMobileMenuOpen(false)}>
                                                Frequently Questions
                                            </Link>
                                        </p>
                                    </div>
                                )}
                            </li>

                            <li className="py-3 hover:text-[#C09578]">
                                <Link to="/Contactus" onClick={() => setIsMobileMenuOpen(false)}>
                                    Contact Us
                                </Link>
                            </li>

                        </ul>
                    )}

                </div>
            </div>


        </>


    )
}

