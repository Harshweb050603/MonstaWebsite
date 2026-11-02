import React from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import { Link } from 'react-router-dom'
import CommonHeading from '../common/CommonHeading'

export default function Contact_us() {
    return (
        <>
            <Header />
            <CommonHeading
                title={'Contact Us'}
                pageName={'Contact Us'} />

            <div className='container max-w-7xl h-[600px] py-5 mx-auto overflow-hidden'>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d71502.9446983553!2d-3.2877396109669714!3d55.94127699965535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4887b800a5982623%3A0x64f2147b7ce71727!2sEdinburgh%2C%20UK!5e0!3m2!1sen!2sin!4v1792652072367!5m2!1sen!2sin"
                    style={{ border: 0 }}
                    width="100%"
                    height="100%"
                    allowfullscreen=""
                    loading="lazy" referrerpolicy="strict-origin-when-cross-origin">

                </iframe>
            </div>

            <div className='contactinfo w-full'>
                <div className="conatiner max-w-7xl mx-auto flex gap-2 py-10">
                    <div className='basis-[50%] '>
                        <h1 className='border-b-1 border-gray-300 py-4 text-[24px]
                        font-semibold about-heading'>Conatct
                            Us </h1>
                        <ul>
                            <li className='py-4 text-gray-400 border-b-1 border-gray-300'> <i class="fa-solid fa-address-book pr-8 "></i> Address : Claritas est etiam processus dynamicus</li>
                            <li className='py-4 text-gray-400 border-b-1 border-gray-300'><i class="fa-solid fa-phone pr-8 "></i> 98745612330</li>
                            <li className='py-4 text-gray-400 '> <i class="fa-regular fa-envelope pr-8 "></i>furniture@gmail.com</li>
                        </ul>
                    </div>
                    <div className='basis-[50%]'>
                        <h1 className='about-heading text-[24px] font-semibold py-4'>Tell Us Your Question</h1>
                        <form action="" className='flex flex-col'>
                            <label
                                htmlFor=""
                                className='font-semibold text-[18px] px-2 mt-5'>Your Name (required)</label>
                            <input
                                className='px-4 py-3 mt-2 ml-2 border border-gray-300 rounded focus:outline-none w-full'
                                type="text"
                                required
                                name="name"
                                id=""
                                placeholder='Name*' />
                            <label
                                htmlFor=""
                                className='font-semibold text-[18px] px-2  mt-5'>Your Email (required)</label>
                            <input
                                className='px-4 py-3 mt-2 ml-2 border border-gray-300 rounded w-full focus:outline-none'
                                type="email"
                                required
                                name="name"
                                id=""
                                placeholder='Email*' />
                            <label
                                htmlFor=""
                                className='font-semibold text-[18px] px-2  mt-5'>Your Mobile No (required)</label>
                            <input
                                className=' focus:outline-none px-4 py-3 mt-2 ml-2 border border-gray-300 rounded w-full'
                                type="text"
                                name="name"
                                id=""
                                placeholder='Mobile Number*'
                                required />
                            <label
                                htmlFor=""
                                className='font-semibold text-[18px] px-2  mt-5'>Subject</label>
                            <input
                                className=' focus:outline-none px-4 py-3 mt-2 ml-2 border border-gray-300 rounded w-full'
                                type="text"
                                name="name"
                                id=""
                                placeholder='Subject*'
                                required />
                            <label
                                htmlFor=""
                                className='font-semibold text-[18px] px-2  mt-5'>Message</label>
                            <textarea
                                className=' focus:outline-none px-4 py-3 mt-2 ml-2 border border-gray-300 rounded w-full h-50'
                                type="textarea"
                                name="name"

                                id=""
                                placeholder='Message*'
                                required />
                            <button className="w-[100px] h-[50px] ml-2 border rounded bg-black text-white mt-5 flex items-center justify-center hover:bg-[#C09578] cursor-pointer">
                                Save
                            </button>

                        </form>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
