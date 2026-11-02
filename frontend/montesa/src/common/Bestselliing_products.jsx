import Card from '@/components/Card'
import { useEffect, useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'


import 'swiper/css'
import 'swiper/css/navigation'
export default function Bestselliing_products({ title, products }) {

    console.log(    'Bestselling Products:', products); // Log the products to the console

    const prevRef = useRef(null)
    const nextRef = useRef(null)
    const swiperRef = useRef(null)






    useEffect(() => {
        if (!swiperRef.current || !prevRef.current || !nextRef.current) {
            return
        }

        const swiper = swiperRef.current

        swiper.params.navigation.prevEl = prevRef.current
        swiper.params.navigation.nextEl = nextRef.current

        swiper.navigation.destroy()
        swiper.navigation.init()
        swiper.navigation.update()

        return () => {
            if (!swiper.destroyed) {
                swiper.navigation.destroy()
            }
        }
    }, [])
    return (
        <>
            <div className="bestsalling mt-5 p-4 w-full">

                {/* Heading */}
                <div className="container mx-auto">
                    <div className="BestsellingProducts_heading flex justify-between items-center">
                        <h1 className="merriweather text-[30px] font-semibold">
                            {title}
                        </h1>
                        <div className='flex'>
                            <button
                                ref={prevRef}
                                className=" text-gray-400 w-10 h-10  flex items-center justify-center cursor-pointer">
                                <i class="fa-solid fa-angle-left"></i>
                            </button>
                            <button
                                ref={nextRef}
                                className=" text-gray-400 w-10 h-10 flex items-center justify-center cursor-pointer"
                            >
                                <i class="fa-solid fa-angle-right"></i>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Swiper Carousel */}
                <div className="container mx-auto w-full mt-5">

                    <Swiper
                        modules={[Navigation]}
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        slidesPerView={4}
                        slidesPerGroup={1}
                        spaceBetween={16}
                        loop={true}
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                                slidesPerGroup: 1,
                            },
                            640: {
                                slidesPerView: 2,
                                slidesPerGroup: 1,
                            },
                            768: {
                                slidesPerView: 3,
                                slidesPerGroup: 1,
                            },
                            1024: {
                                slidesPerView: 4,
                                slidesPerGroup: 1,
                            },
                        }}
                    >

                        {products.map((product) => (
                            <SwiperSlide key={product._id}>
                                <Card
                                 product={product} 
                                  products={products}/>
                            </SwiperSlide>
                        ))}

                    </Swiper>

                </div>

            </div>
        </>
    )
}
