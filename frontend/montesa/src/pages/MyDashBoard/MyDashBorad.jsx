import Header from "@/common/Header"
import CommonHeading from "@/common/CommonHeading"
import OrderDetails from "./OrderDetails";
import { useState } from "react";
export default function MyDashBoard() {
    const [selectedOrder, setSelectedOrder] = useState(false);
    return (
        <>
            <Header />
            <CommonHeading
                title={'My DashBorad'}
                pageName={'My DashBoard'}
            />
            {/* // parent div My dashBorad */}
            <div className="container w-full mx-auto py-16">
                <div className="max-w-6xl mx-auto grid grid-cols-[280px_1fr] gap-8">
                    {/* left Side for Buttons */}
                    <div className="left bg-white border border-gray-200 rounded-md p-5">

                        <h3 className="text-lg font-semibold mb-5 px-3">
                            My Account
                        </h3>

                        <ul className="flex flex-col gap-2">

                            <li>
                                <button className="w-full text-left px-3 py-3 rounded-md bg-[#C09578] text-white">
                                    My Dashboard
                                </button>
                            </li>

                            <li>
                                <button className="w-full text-left px-4 py-3 rounded-md  bg-black hover:bg-[#C09578] text-white">
                                    Orders
                                </button>
                            </li>

                            <li>
                                <button className="w-full text-left px-4 py-3 rounded-md  bg-black hover:bg-[#C09578] text-white">
                                    My Profile
                                </button>
                            </li>

                            <li>
                                <button className="w-full text-left px-4 py-3 rounded-md  bg-black hover:bg-[#C09578] text-white">
                                    Address
                                </button>
                            </li>

                            <li>
                                <button className="w-full text-left px-4 py-3 rounded-md  bg-black hover:bg-[#C09578] text-white">
                                    Change Password
                                </button>
                            </li>

                            <li>
                                <button className="w-full text-left px-4 py-3 rounded-md text-red-50 bg-black hover:bg-[#C09578] text-white">
                                    Logout
                                </button>
                            </li>

                        </ul>
                    </div>
                    {/* right Side for Data */}
                    <div className="right">
                            {
                                selectedOrder ? ( <OrderDetails/>) : ( <>

                                     <div className="border border-gray-200 rounded-md p-6">

                            <h2 className="text-2xl font-semibold mb-3">
                                Welcome to My Account!
                            </h2>

                            <p className="text-gray-600 leading-7">
                                From your account dashboard, you can easily check your recent
                                orders, manage your shipping and billing addresses, and edit
                                your password and account details.
                            </p>

                        </div>
                        <div className="mt-8">

                            <h2 className="text-xl font-semibold mb-5">
                                Recent Orders
                            </h2>

                            <div className="overflow-x-auto border border-gray-200 rounded-md">

                                <table className="w-full text-left">

                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="p-4">Product</th>
                                            <th className="p-4">Price</th>
                                            <th className="p-4">Quantity</th>
                                            <th className="p-4">Total</th>
                                            <th className="p-4">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>

                                        <tr className="border-t">
                                            <td className="p-4">
                                                Modern Sofa
                                            </td>
                                            <td className="p-4">₹25,000</td>
                                            <td className="p-4">1</td>
                                            <td className="p-4">₹25,000</td>
                                            <td className="p-4">
                                                <button className="text-[#C09578] font-medium hover:underline"
                                                  onClick={() => setSelectedOrder(true)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>

                                        <tr className="border-t">
                                            <td className="p-4">
                                                Wooden Dining Table
                                            </td>
                                            <td className="p-4">₹15,000</td>
                                            <td className="p-4">2</td>
                                            <td className="p-4">₹30,000</td>
                                            <td className="p-4">
                                                <button className="text-[#C09578] font-medium hover:underline"
                                              onClick={() => setSelectedOrder(true)}>
                                                    View
                                                </button>
                                            </td>
                                        </tr>

                                    </tbody>

                                </table>

                            </div>
                        </div>
                                </>)
                            }
                       

                    </div>
                </div>
            </div>
        </>
    )
}
