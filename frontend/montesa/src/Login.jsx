
import Header from './common/Header'
import Footer from './common/Footer'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import api from './services/api';
import { toast, ToastContainer } from 'react-toastify';
import VerifyOtp from './pages/VerifyOtp';
import { useAuth } from './Context/AuthContext.jsx';

export default function Login() {
    const [registerData, setRegisterData] = useState({
        username: "",
        email: '',
        password: ''
    });
    const [loginData, setloginData] = useState({
        username: "",
        email: '',
        password: ''
    })

    const navigate = useNavigate()
    const [showOtp, setShowOtp] = useState(false);
    const [otpEmail, setOtpEmail] = useState("");

    
    const {
        login: saveLogin,
        user,
        isLoading,
        isAuthenticated,
        accessToken
    } = useAuth();
    console.log("User:", user);
    console.log("Login Status:", isAuthenticated);
    console.log("Access Token:", accessToken);
    const handleRegister = async (event) => {

        event.preventDefault();

        try {
            const response = await api.post(
                'api/auth/register'
                , registerData
            );

            // Email save karo
            setOtpEmail(registerData.email);

            // OTP popup open karo
            setShowOtp(true);

            console.log(response.data)
            toast.success(response.data.message);



            setRegisterData({
                username: "",
                email: '',
                password: ''


            })



        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "Something went wrong");
        }

    }
    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await api.post(
                'api/auth/login',
                loginData
            )
            // Access token aur user details AuthContext mein save
            saveLogin(
                response.data.accessToken,
                response.data.users
            );
            toast.success(response.data.message)
            console.log("Access Token:", response.data.accessToken);
            navigate(
                '/'
            )

            setloginData({
                username: "",
                email: '',
                password: ''

            })
        } catch (error) {
            console.log(error, "loginerror")
            toast.error(
                error.response?.data?.message || "Something went wrong"
            );

        }
    }
    let getValues = (event) => {
        let inputname = event.target.name
        let inputValue = event.target.value
        let getOldData = { ...registerData }
        getOldData[inputname] = inputValue
        setRegisterData(getOldData)
    }
    let getLoginValues = (event) => {
        let logininputname = event.target.name
        let loginInputValue = event.target.value
        let getLoginOldData = { ...loginData }
        getLoginOldData[logininputname] = loginInputValue
        setloginData(getLoginOldData)
    }
    return (
        <>
            <Header />
            <ToastContainer />
            {isLoading ? (
                <p>Checking session...</p>
            ) : (
                <p>Session check complete</p>
            )}
            <div className='container mx-auto max-w-7xl py-15 text-center border-gray-300 border-b-1'>
                <h1 className='text-center text-4xl about-heading font-bold'>My Account</h1>
                <span className='p-2 inline-block text-[18px] font-400'>
                    <Link to={'/'}>Home</Link> < span className=' inline-block text-[#C09578] pl-2'>My Account</span>
                </span>
            </div>
            <div className="container max-w-7xl mx-auto flex gap-5 py-10 mb-5 border-b-1 border-gray-300 ">
                <div className='basis-[50%]'>
                    <h1 className='about-heading py-5 text-[35px]'>Login</h1>
                    <form
                        action=""
                        className='border border-gray-300 p-5 rounded'
                        onSubmit={handleLogin}>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-semibold py-2'>Username*</label>
                            <input
                                type="text"
                                placeholder='Username'
                                name="username"
                                onChange={getLoginValues}
                                value={loginData.username}
                                autoComplete="off"
                                className='p-2 focus:outline-none border-gray-300 border' />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="" className='font-semibold py-2'>Email*</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email Address'
                                onChange={getLoginValues}
                                value={loginData.email}
                                autoComplete="off"
                                className='p-2 focus:outline-none border-gray-300 border' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="" className='font-semibold py-2'>Password*</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                onChange={getLoginValues}
                                value={loginData.password}
                                autoComplete="off"
                                className='p-2 focus:outline-none border-gray-300 border' />
                        </div>
                        <div className='flex py-7 justify-between'>
                            <p className='text-[#C09578] cursor-pointer'>Forget Password ?</p>
                            <button className='cursor-pointer rounded-full hover:bg-black w-[100px] py-2 font-bold flex items-center text-white bg-[#C09578] justify-center' type='submit'>LOGIN</button>
                        </div>

                    </form>
                </div>
                <div className='basis-[50%]'>
                    <h1 className='about-heading py-5 text-[35px] '>Register</h1>
                    <form
                        action=""
                        className='border border-gray-300 p-5 rounded'
                        onSubmit={handleRegister}>
                        <div className='flex flex-col'>
                            <label htmlFor="semi" className='font-semibold py-2'>Username*</label>
                            <input
                                type="text"
                                placeholder='Username'
                                name="username"
                                onChange={getValues}
                                value={registerData.username}
                                autoComplete="off"

                                className='p-2 focus:outline-none border-gray-300 border' />
                        </div>
                        <div
                            v className='flex flex-col'>
                            <label htmlFor="semi" className='font-semibold py-2'>Email Address*</label>
                            <input
                                type="email"
                                name="email"
                                placeholder='Email Address'
                                onChange={getValues}
                                value={registerData.email}
                                autoComplete="off"
                                className='p-2 focus:outline-none border-gray-300 border' />
                        </div>
                        <div className='flex flex-col mt-4'>
                            <label htmlFor="" className='font-semibold py-2'>Password*</label>
                            <input
                                type="password"
                                name="password"
                                placeholder='Password'
                                onChange={getValues}
                                value={registerData.password}
                                autoComplete="off"
                                className='p-2 focus:outline-none border-gray-300 border' />
                        </div>
                        <div className='flex py-7 flex-row-reverse'>
                            <button type='submit' className='cursor-pointer rounded-full hover:bg-black w-[100px] py-2 font-bold flex items-center text-white bg-[#C09578] justify-center'>Register</button>
                        </div>
                    </form>
                </div>
            </div>
            {showOtp && (
                <VerifyOtp
                    email={otpEmail}
                    onClose={() => setShowOtp(false)}
                />
            )}
            <Footer />
        </>
    )
}
