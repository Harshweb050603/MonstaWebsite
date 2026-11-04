
// import Header from '../src/common/Header.jsx'

import Header from '../src/common/Header.jsx'
import herosection from '../public/photos/Online Furniture in India/herosection.jpg'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import chair1 from '../public/photos/Online Furniture in India/home_img1.webp'
import chair2 from '../public/photos/Online Furniture in India/home_img2.webp'
import Card from '../src/components/Card.jsx'
import Footer from './common/Footer.jsx';
import { Link } from 'react-router-dom';
import Bestselliing_products from './common/Bestselliing_products.jsx';

import { useEffect, useState } from 'react';
import api from './services/api.jsx';

export default function App() {

  const [products, setProducts] = useState([]);
  const [wishlistIds, setWishlistIds] = useState([]);
 const handleWishlistChange = (productId, action) => {
  if (action === "add") {
    setWishlistIds((prevIds) =>
      prevIds.includes(productId) ? prevIds : [...prevIds, productId]
    );
  } else if (action === "remove") {
    setWishlistIds((prevIds) =>
      prevIds.filter((id) => id !== productId)
    );
  }
};
  useEffect(() => {
    api.get("/api/product/getProducts")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await api.get("/api/wishlist");

        const products = response.data.wishlist?.products || [];

        setWishlistIds(products.map((product) => product._id));

      } catch (error) {
        console.log("Wishlist fetch error:", error);
      }
    };

    fetchWishlist();
  }, []);
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Header />
      <div className='hero-section'>
        <img src={herosection} alt="herosection" />
      </div>
      {/* chair section */}
      <div className='chairSection p-10 border-b-2 border-[#EBEBEB]'>
        <div className="container m-auto flex justify-center gap-10">

          <Link to={'/Categoires'} className=' overflow-hidden w-1/2 relative group'>
            <img src={chair1} alt="chair" className='transition-transform duration-300 ease-in-out group-hover:scale-110 w-full  ' />

            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

            <div className='absolute top-[20px] left-[20px]'>
              <p className='font-[500] text-[18px] font-sans'>Design Creative</p>
              <h1 className='font-semibold text-[30px] font-serif'>Chair Collection</h1>
            </div>

          </Link>



          <Link to={'/Categoires'} className=' overflow-hidden w-1/2 relative group'>
            <img src={chair2} alt="chair" className='transition-transform duration-300 ease-in-out group-hover:scale-110 w-full' />

            <  div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

            <div className='absolute top-[20px] left-[20px]'>
              <p className='font-[500] text-[18px] font-sans'>Design Creative</p>
              <h1 className='font-semibold text-[30px] font-serif'>Chair Collection</h1>
            </div>
          </Link>

          <Link to={'/Categoires'} className=' overflow-hidden w-1/2 relative group'>
            <img src={chair1} alt="chair" className='transition-transform duration-300 ease-in-out group-hover:scale-110 w-full' />

            <  div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>

            <div className='absolute top-[20px] left-[20px]'>
              <p className='font-[500] text-[18px] font-sans'>Design Creative</p>
              <h1 className='font-semibold text-[30px] font-serif'>Chair Collection</h1>
            </div>
          </Link>

        </div>
      </div>
      {/* sales section  */}
      <div className='w-full  p-19 '>
        <div className="container m-auto flex justify-center relative">
          <div className='p-5 hover:text-[#CA9376] font-bold font-serif text-[25px] active-sales'>Feature</div>
          <div className='p-5 hover:text-[#CA9376] font-bold font-serif text-[25px] border border-[#EBEBEB]'>New Arrivals</div>
          <div className='p-5 hover:text-[#CA9376] font-bold font-serif text-[25px] border border-[#EBEBEB]'>Onsale</div>
        </div>
      </div>
      {/* cards */}
      <div className='container m-auto grid grid-cols-4 gap-10 wrap cards'>
        {
          products.map((product) => (
            <Card key={product._id}
              product={product}
              products={products}
              wishlistIds={wishlistIds}
               onWishlistChange={handleWishlistChange}
            />

          ))
        }
      </div>
      {/* trending collection */}
      <div className='trending_collection w-full relative overflow-hidden '>
        <div>
          <img src="public/photos/Online Furniture in India/newCollection.jpg" alt="image" className='w-full scale-120 h-[500px]' />
        </div>
        <div className='container m-auto pl-15 absolute top-10 left-20 hover:scale-110 transistion transform duration-500'>
          <h1 className='font-semibold text-[60px] p-8 merriweather'>New Trending Collection</h1>
          <p className='text-gray-500 text-[20px] pl-10'>We beleive That Good Design is Always in Season</p>

          <div className='p-10 pt-32 '>
            <button className='border-3 rounded border-[#C09578] pt-3 pl-9 pr-9 pb-3'>Shopping Now</button>
          </div>
        </div>
      </div>
      {/* bestselling section */}
      <Bestselliing_products
        title='BestSelling Products'
        products={products}
        wishlistIds={wishlistIds}
         onWishlistChange={handleWishlistChange}
      />
      {/* About facilities provide  */}
      <div className='w-full bg-[#F8F9F9] mt-5'>
        <div className="container  m-auto flex flex-row justify-between p-5">
          <div className='basis-[33.33%] p-8'>
            <div className="w-[70px] h-[70px] rounded-full m-auto p-4 border flex items-center justify-center hover:text-[#C09578]">
              <i className="fa-solid fa-earth-americas"></i>
            </div>
            <p className='p-2 text-center font-bold text-[20px] merriweather mt-2'>Free Shipping </p>
            <p className='text-center text-gray-400 text-[18px]'>Free shipping on all order</p>
          </div>
          <div className='basis-[33.33%] p-8'>
            <div className="w-[70px] h-[70px] rounded-full m-auto p-4 border flex items-center justify-center hover:text-[#C09578]">
              <i class="fa-regular fa-circle-check"></i>
            </div>
            <p className='p-2 text-center font-bold text-[20px] merriweather mt-2'>Money Return </p>
            <p className='text-center text-gray-400 text-[18px]'>Back guarantee under 7 days</p>
          </div>
          <div className='basis-[33.33%] p-8'>
            <div className="w-[70px] h-[70px] rounded-full m-auto p-4 border flex items-center justify-center hover:text-[#C09578]">
              <i class="fa-regular fa-clock"></i>
            </div>
            <p className='p-2 text-center font-bold text-[20px] merriweather mt-2'>Online Support </p>
            <p className='text-center text-gray-400 text-[18px]'>Support online 24 hours a day</p>
          </div>
        </div>
      </div>
      {/* crausel of Customers reviews */}

      <div className="w-full bg-white py-16">
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

      {/* Our Newsletter */}
      <div className='w-full bg-[#F8F9F9] py-10'>
        <div className='container m-auto '>
          <div className='flex flex-col mx-w-3xl m-auto mt-5 mb-5 items-center'>
            <h1 className='pt-2 text-center pb-2 text-[30px] merriweather'> Our Newsletter </h1>
            <p className='text-m text-[#696B69] mb-5'>Get E-mail updates about our latest shop and special offers.</p>

            <div className="w-full max-w-3xl mx-auto flex items-stretch">
              <input
                type="email"
                placeholder="Email address..."
                className="min-w-0 flex-1 border-3 rounded border-gray-300 px-4 py-3 outline-none "
              />

              <button
                type="button"
                className="shrink-0 bg-[#C09578] rounded px-10 py-3 text-white hover:bg-black hover:text-white cursor-pointer transition-colors"
              >
                Subscribe
              </button>
            </div>

          </div>
        </div>
      </div>
      {/* footer */}
      <div className='w-full bg-white py-16'>
        <Footer />
      </div>
    </>
  )
}
