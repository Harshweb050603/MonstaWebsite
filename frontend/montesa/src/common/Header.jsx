
import logo from "../../public/photos/Online Furniture in India/logo.png";
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CartContent from '../common/CartContent.jsx';
import { useAuth } from "@/Context/AuthContext";
import api from "@/services/api";
export default function Header() {
    const [isCartOpen, setIsCartOpen] = useState(false)
    const { user, isAuthenticated, logout: clearAuth } = useAuth();
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
                    <div className='col col-12 flex justify-between p-2 '>
                        <span>Contact us 24/7 : +91-98745612330 / furniture@gmail.com</span>
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
                                            to="/MyProfile"
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
                <div className="container m-auto p-6 flex justify-between">
                    <div className='left-section'>
                        <img src={logo} alt="logo" width={150} />
                    </div>
                    <div className='right-section flex justify-between align-items'>
                        <div className=' flex items-center border border-[#EBEBEB] px-2 rounded'>
                            <input type="text" placeholder='Search product...' className='text-gray outline-none' />
                            <span><i className="fa-solid fa-magnifying-glass hover:text-[#C09578] cursor-pointer"></i>
                            </span>
                        </div>
                        <Link to={'/Wishlist'} className='flex items-center align-items'>
                            <div className='whishlist flex ml-4 items-center align-items border border-[#EBEBEB] py-4 px-4 rounded'>
                                <i className="fa-solid fa-heart hover:text-[#C09578] cursor-pointer"></i>
                            </div>
                        </Link>

                        <div className='cart-count hover:text-[#C09578] cursor-pointer flex align-items items-center ml-4 relative '>

                            <div
                                onClick={() => setIsCartOpen(true)}
                                className="cart-count hover:text-[#C09578] cursor-pointer flex items-center p-3 border border-[#EBEBEB] ml-4 relative rounded"
                            >
                                <div className="count absolute left-[-9px] top-[13px] bg-[#C09578] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                    0
                                </div>

                                <i className="fa-solid fa-cart-shopping mr-2"></i>

                                <span className="mx-2">|</span>

                                <b>Rs. 0.00</b>

                            </div>

                            {/* Cart Sidebar */}

                            <div
                                className={`fixed inset-0 z-[9999] ${isCartOpen ? 'visible' : 'invisible'
                                    }`}
                            >
                                {/* Background Overlay */}
                                <div
                                    onClick={() => setIsCartOpen(false)}
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
            <div className='navbar-section border border-[#EBEBEB]  sticky top-0 bg-white z-50 '>
                <div className="container m-auto p-6 ">
                    <ul className='flex justify-center gap-10 font-semibold cursor-pointer  '>
                        <li className='active-menu hover:text-[#C09578]'><Link to={'/'}>Home</Link></li>
                        <li className=" group hover:text-[#C09578] cursor-pointer ">
                            CATEGORY ROOT

                            <div
                                className=" dropdown-3d absolute top-full left-130 w-[500px] p-4 h-30
                                bg-white  text-black
                                invisible opacity-0 translate-y-2
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                                transition-all duration-300 ease-in-out border-1 border-gray-200"
                            >
                                Test
                            </div>
                        </li>
                        <li className=' group hover:text-[#C09578]'>LIVING
                            <div
                                className=" dropdown-3d absolute top-full left-170 w-[500px] p-4 h-auto
                                bg-white  text-black
                                invisible opacity-0 translate-y-2
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                                transition-all duration-300 ease-in-out flex justify-between border-1 border-gray-200"
                            >
                                <div>
                                    <h1 className='font-semibold'>Tables</h1>
                                    <ul className='text-gray-500 pt-5'>
                                        <li>side and tables</li>

                                    </ul>
                                </div>
                                <div>
                                    <h1>mirror</h1>
                                </div>
                                <div>
                                    <h1>
                                        Living
                                        storage/Collection</h1>
                                </div>
                            </div> </li>
                        <li className=' group hover:text-[#C09578]'>SOFA
                            <div
                                className=" dropdown-3d absolute top-full left-200 w-[500px] p-4 h-30
                                bg-white flex justify-between  text-black
                                invisible opacity-0 translate-y-2
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                                transition-all duration-300 ease-in-out border-1 border-gray-200"
                            >
                                <div>
                                    <h1 className='font-semibold'>Tables</h1>
                                    <ul className='text-gray-500 pt-5'>
                                        <li>side and tables</li>

                                    </ul>
                                </div>
                                <div>
                                    <h1>mirror</h1>
                                </div>
                                <div>
                                    <h1>
                                        Living
                                        storage/Collection</h1>
                                </div>
                            </div>
                        </li>
                        <li className=' group hover:text-[#C09578]'>PAGES
                            <div
                                className=" dropdown-3d absolute top-full left-220 w-[200px] p-4 h-50
                                bg-white  text-black
                                invisible opacity-0 translate-y-2
                                group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                                transition-all duration-300 ease-in-out flex justify-between border-1 border-gray-200"
                            >
                                <div>
                                    <ul className='text-[#808080] font-400 pt-5'>
                                        <li className='pb-3 hover:text-[#C09578]'><Link to={'/Aboutus'}>About us</Link> </li>
                                        <li className='pb-3 hover:text-[#C09578]'><Link to={'/'}>CheckOut</Link></li>
                                        <li className='pb-3 hover:text-[#C09578]'><Link to={'/Cart'}>Cart</Link></li>
                                        <li className='pb-3 hover:text-[#C09578]'><Link to={'/Frequently_questions'}>Frequently Questions</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </li>
                        <li className='hover:text-[#C09578]'> <Link to={'/Contactus'}>Contact Us</Link></li>
                    </ul>
                </div>
            </div>


        </>


    )
}

