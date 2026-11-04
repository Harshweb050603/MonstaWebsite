import Header from "@/common/Header"
import CommonHeading from "@/common/CommonHeading"
import OrderDetails from "./OrderDetails";
import { useState, useEffect } from "react";
import Orders from "./Orders";
import MyProfile from "./MyProfile";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import { useAuth } from "@/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "@/services/api";
export default function MyDashBoard() {
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [activeTab, setActiveTab] = useState("dashboard");
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [recentOrders, setRecentOrders] = useState([]);
    const handleLogout = async () => {
        try {
            await api.post("/api/auth/logout");
            logout();
            navigate("/Login");
        } catch (error) {
            console.log("Logout error:", error);
        }
    };
    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const response = await api.get("/api/orders/my-orders");
                setRecentOrders(response.data.orders.slice(0, 5));
            } catch (error) {
                console.log("Recent Orders Error:", error);
            }
        };

        fetchRecentOrders();
    }, []);
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
                                <button
                                    onClick={() => setActiveTab("dashboard")}
                                    className={`w-full text-left px-3 py-3 rounded-md text-white ${activeTab === "dashboard"
                                        ? "bg-[#C09578]"
                                        : "bg-black hover:bg-[#C09578]"
                                        }`}
                                >
                                    My Dashboard
                                </button>
                            </li>

                            <li>
                                <button

                                    onClick={() => setActiveTab("orders")}
                                    className={`w-full text-left px-4 py-3 rounded-md text-white ${activeTab === "orders"
                                        ? "bg-[#C09578]"
                                        : "bg-black hover:bg-[#C09578]"
                                        }`}
                                >
                                    Orders
                                </button>
                            </li>

                            <li>
                                <button onClick={() => setActiveTab("profile")}
                                    className={`w-full text-left px-4 py-3 rounded-md text-white ${activeTab === "profile"
                                        ? "bg-[#C09578]"
                                        : "bg-black hover:bg-[#C09578]"
                                        }`}>
                                    My Profile
                                </button>
                            </li>

                            <li>
                                <button onClick={() => setActiveTab("address")}
                                    className={`w-full text-left px-4 py-3 rounded-md text-white ${activeTab === "address"
                                        ? "bg-[#C09578]"
                                        : "bg-black hover:bg-[#C09578]"
                                        }`}>
                                    Address
                                </button>
                            </li>

                            <li>
                                <button onClick={() => setActiveTab("password")}
                                    className={`w-full text-left px-4 py-3 rounded-md text-white ${activeTab === "password"
                                        ? "bg-[#C09578]"
                                        : "bg-black hover:bg-[#C09578]"
                                        }`}>
                                    Change Password
                                </button>
                            </li>

                            <li>
                                <button onClick={handleLogout}
                                    className='w-full text-left px-4 py-3 rounded-md text-white  bg-black hover:bg-[#C09578]'>
                                    Logout
                                </button>
                            </li>

                        </ul>
                    </div>
                    {/* right Side for Data */}
                    <div className="right">
                        {
                            activeTab === "orderDetails" ? (
                                <OrderDetails
                                    order={selectedOrder}
                                    onBack={() => setActiveTab("orders")}
                                />)
                                : activeTab === "orders"
                                    ? (<Orders
                                        onView={(order) => {
                                            setSelectedOrder(order);
                                            setActiveTab("orderDetails");
                                        }}
                                    />

                                    )
                                    :
                                    activeTab === "profile" ? (
                                        <MyProfile />
                                    ) : activeTab === 'address' ? (
                                        <Address />
                                    ) : activeTab === 'password' ? (
                                        <ChangePassword />
                                    ) :
                                        (<>

                                            <div className="mt-8">
                                                <div className="flex justify-between items-center mb-5">
                                                    <h2 className="text-xl font-semibold">
                                                        Recent Orders
                                                    </h2>

                                                    <button
                                                        onClick={() => setActiveTab("orders")}
                                                        className="text-[#C09578] font-medium hover:underline"
                                                    >
                                                        View All
                                                    </button>
                                                </div>

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
                                                            {recentOrders.length > 0 ? (
                                                                recentOrders.map((order) => (
                                                                    <tr key={order._id} className="border-t">

                                                                        <td className="p-4">
                                                                            {order.products[0]?.name}
                                                                            {order.products.length > 1 &&
                                                                                ` + ${order.products.length - 1} more`
                                                                            }
                                                                        </td>

                                                                        <td className="p-4">
                                                                            ₹{order.products[0]?.price?.toLocaleString("en-IN")}
                                                                        </td>

                                                                        <td className="p-4">
                                                                            {order.products[0]?.quantity}
                                                                        </td>

                                                                        <td className="p-4">
                                                                            ₹{order.totalAmount?.toLocaleString("en-IN")}
                                                                        </td>

                                                                        <td className="p-4">
                                                                            <button
                                                                                onClick={() => {
                                                                                    setSelectedOrder(order);
                                                                                    setActiveTab("orderDetails");
                                                                                }}
                                                                                className="text-[#C09578] font-medium hover:underline"
                                                                            >
                                                                                View
                                                                            </button>
                                                                        </td>

                                                                    </tr>
                                                                ))
                                                            ) : (
                                                                <tr>
                                                                    <td colSpan="5" className="p-6 text-center text-gray-500">
                                                                        No recent orders found.
                                                                    </td>
                                                                </tr>
                                                            )}
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
