import { useState, useEffect } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export default function VerifyOtp({ email, onClose }) {

    const [otp, setOtp] = useState("");
    const [timer, setTimer] = useState(0);
    const [isResending, setIsResending] = useState(false);


    useEffect(() => {
        if (timer <= 0) return;

        const intervalId = setInterval(() => {
            setTimer((previousTimer) => previousTimer - 1);
        }, 1000);

        return () => clearInterval(intervalId);
    }, [timer]);
    const handleVerifyOtp = async () => {

        if (otp.length !== 6) {
            toast.error("Please enter a valid 6 digit OTP");
            return;
        }

        try {
            const response = await api.post(
                '/api/auth/verify-otp',
                {
                    email: email,
                    otp: otp
                }
            );

            toast.success(response.data.message);

            onClose();

        } catch (error) {
            console.log(error);

            toast.error(
                error.response?.data?.message || "OTP verification failed"
            );
        }
    };
    const handleResendOtp = async () => {

        if (timer > 0 || isResending) return
        setIsResending(true)
        try {

            const response = await api.post('/api/auth/resendOtp',
                { email }
            )

            toast.success(response.data.message);
            setOtp("")
            setTimer(10);
        } catch (error) {
            console.log("Resend OTP Error:", error);
            console.log("Response data:", error.response?.data);
            console.log("Status:", error.response?.status);

            toast.error(
                error.response?.data?.message || "Unable to resend OTP"
            );
        } finally {
            setIsResending(false);
        }


    };




    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">

            <div className="relative w-full max-w-md rounded-xl bg-white p-8 shadow-xl">

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-3 text-2xl"
                >
                    &times;
                </button>

                <h2 className="mb-3 text-center text-2xl font-bold">
                    Verify Your Email
                </h2>

                <p className="mb-6 text-center text-gray-600">
                    OTP sent to: {email}
                </p>

                <input
                    type="text"
                    placeholder="Enter 6 digit OTP"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => {
                        const value = e.target.value;
                        if (/^\d*$/.test(value)) {
                            setOtp(value);
                        }
                    }}
                    className="w-full rounded border border-gray-300 p-3 text-center text-xl tracking-[10px] focus:outline-none"
                />

                <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="mt-5 w-full rounded-full bg-[#C09578] py-3 font-bold text-white hover:bg-black"
                >
                    Verify OTP
                </button>
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={timer > 0 || isResending}
                    className={`mt-3 w-full rounded-full border border-[#C09578] py-3 font-bold ${timer > 0 || isResending
                            ? 'cursor-not-allowed opacity-50'
                            : 'text-[#C09578] hover:bg-[#C09578] hover:text-white'
                        }`}
                >
                    {isResending
                        ? 'Sending OTP...'
                        : timer > 0
                            ? `Resend OTP in ${timer}s`
                            : 'Resend OTP'}
                </button>

            </div>
        </div>
    );
}