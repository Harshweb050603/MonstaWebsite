import React from 'react'
import Header from '../common/Header'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Footer from '../common/Footer';
import CommonHeading from '../common/CommonHeading';

export default function About_us() {
    return (
        <>
            <div className='Aboutus w-full  '>
                <Header />
                <CommonHeading
                title={'About us'}
                pageName={'About Us'}
                />
                <div className='aboutsection py-16 max-w-7xl mx-auto'>
                    <img
                        src="public/photos/Online Furniture in India/aboutus.jpg"
                        alt="watch"
                        className='w-full object-cover object-center ' />

                    <h1 className='text-center py-4 text-3xl about-heading font-semibold'>Welcome To Monsta !</h1>
                    <p className='leading-7 text-[#696B69] py-3 text-center'>Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Typi non habent claritatem insitam, est usus legentis in iis qui facit eorum claritatem.</p>
                    <p className='py-5 text-[#C09578] text-center'>“There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form.”</p>

                </div>

                <div className="container max-w-7xl mx-auto py-5 px-4">
                    <h1 className="text-3xl about-heading text-center">
                        Why Choose Us !
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-7 gap-8 py-6">

                        {/* Left Section */}
                        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-8">

                            <div className=" max-w-[600px] mx-auto ">

                                <img
                                    src="/photos/Online Furniture in India/homeimag.jpg"
                                    alt="Money back guarantee"
                                    className="w-[100px] h-[100px] mx-auto object-cover"
                                />



                                <h2 className="py-2 text-center font-semibold">
                                    100% Money Back Guarantee
                                </h2>

                                <p className="leading-7 text-[#696B69] text-center">
                                    Erat metus sodales eget dolor consectetuer,
                                    porta ut purus at et alias, nulla ornare velit
                                    amet enim.
                                </p>
                            </div>

                            <div className="max-w-[600px] mx-auto">
                                <img
                                    src="/photos/Online Furniture in India/support.jpg"
                                    alt="Money back guarantee"
                                    className="w-[100px] h-[100px] mx-auto object-cover"
                                />

                                <h2 className="py-2 text-center font-semibold">
                                    100% Money Back Guarantee
                                </h2>

                                <p className="leading-7 text-[#696B69] text-center">
                                    Erat metus sodales eget dolor consectetuer,
                                    porta ut purus at et alias, nulla ornare velit
                                    amet enim.
                                </p>
                            </div>

                        </div>

                        {/* Right Section */}
                        <div className="md:col-span-3 flex flex-col items-center justify-center">
                            <img src="photos/Online Furniture in India/whychosemain.jpg" alt="" />
                            <h2 className='pb-2 font-semibold'>Creative-Design</h2>
                            <p className='text-[#696B69] text-center'>Erat metus sodales eget dolor consectetuer, porta ut purus at et alias, nulla ornare velit amet enim God has created everything like air,water,tree and metal</p>
                        </div>

                    </div>
                </div>
                <div className="container max-w-7xl mx-auto flex flex-row gap-2">
                    <div className='py-4 basis-sm mx-auto'>
                        <div>
                            <img src="public/photos/Online Furniture in India/whatdowedo.jpg"
                                alt="girl"
                                className=' w-full object-cover' />
                        </div>
                        <h1 className='py-3 text-center'>What Do We Do ? </h1>
                        <p className='text-center'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                    </div>
                    <div className='py-4 basis-sm mx-auto'>
                        <div>
                            <img src="public/photos/Online Furniture in India/ourmission.jpg"
                                alt="girl"
                                className=' w-full object-cover' />
                        </div>
                        <h1 className='py-3 text-center'>Our Mission ? </h1>
                        <p className='text-center'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                    </div>
                    <div className='py-4 basis-sm mx-auto'>
                        <div>
                            <img src="public/photos/Online Furniture in India/historyofus.jpg"
                                alt="girl"
                                className=' w-full object-cover' />
                        </div>
                        <h1 className='py-3 text-center'>History Of Us  ? </h1>
                        <p className='text-center'>Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis per seacula quarta decima et quinta decima.</p>
                    </div>
                </div>
                <div className="w-full bg-white py-16 border-gray-400 mb-16 border-b-1 ">
                    <div className="container mx-auto px-4">
                        <h1 className="text-[25px] font-bold merriweather p-3 text-center">
                            What Our Customers Say?
                        </h1>

                        <Swiper
                            modules={[Pagination, Autoplay]}
                            slidesPerView={1}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            loop={true}
                            navigation={false}
                            className="customer-swiper"
                        >
                            {/* Customer 1 */}
                            <SwiperSlide>
                                <div className="max-w-3xl mx-auto flex flex-col items-center text-center pt-6 pb-12">
                                    <p className="text-gray-400 text-base leading-7 px-4 md:px-10">
                                        These guys have been absolutely outstanding. Perfect themes
                                        and the best of all, you have many options to choose from!
                                        Best support team ever. Very fast responding! I highly
                                        recommend this theme and these people!
                                    </p>

                                    <img
                                        src="/photos/Online Furniture in India/Customer3.jpg"
                                        alt="Khati Young"
                                        className="w-20 h-20 rounded-full object-cover object-center mt-6 mb-4"
                                    />

                                    <h3 className="font-semibold text-lg">
                                        Khati Young
                                    </h3>

                                    <p className="text-gray-400 text-sm mt-1">
                                        CEO of SunPark
                                    </p>

                                    <div className="text-[#C09578] flex justify-center gap-1 mt-4">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <i key={star} className="fa-solid fa-star"></i>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Customer 2 */}
                            <SwiperSlide>
                                <div className="max-w-3xl mx-auto flex flex-col items-center text-center pt-6 pb-12">
                                    <p className="text-gray-400 text-base leading-7 px-4 md:px-10">
                                        These guys have been absolutely outstanding. Perfect themes
                                        and a great selection to choose from. The support team is
                                        helpful and responds quickly!
                                    </p>

                                    <img
                                        src="/photos/Online Furniture in India/Customer1.jpg"
                                        alt="Katherine Young"
                                        className="w-20 h-20 rounded-full object-cover object-center mt-6 mb-4"
                                    />

                                    <h3 className="font-semibold text-lg">
                                        Katherine Young
                                    </h3>

                                    <p className="text-gray-400 text-sm mt-1">
                                        CEO of SunPark
                                    </p>

                                    <div className="text-[#C09578] flex justify-center gap-1 mt-4">
                                        {[1, 2, 3].map((star) => (
                                            <i key={star} className="fa-solid fa-star"></i>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>

                            {/* Customer 3 */}
                            <SwiperSlide>
                                <div className="max-w-3xl mx-auto flex flex-col items-center text-center pt-6 pb-12">
                                    <p className="text-gray-400 text-base leading-7 px-4 md:px-10">
                                        Excellent design, great choices and outstanding support.
                                        Everything was smooth, and I would happily recommend them!
                                    </p>

                                    <img
                                        src="/photos/Online Furniture in India/Customer2.png"
                                        alt="Samuel Young"
                                        className="w-20 h-20 rounded-full object-cover object-center mt-6 mb-4"
                                    />

                                    <h3 className="font-semibold text-lg">
                                        Samuel Young
                                    </h3>

                                    <p className="text-gray-400 text-sm mt-1">
                                        CEO of SunPark
                                    </p>

                                    <div className="text-[#C09578] flex justify-center gap-1 mt-4">
                                        {[1, 2, 3, 4].map((star) => (
                                            <i key={star} className="fa-solid fa-star"></i>
                                        ))}
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>
                    </div>
                </div>
                <Footer/>
            </div>

        </>
    )
}
