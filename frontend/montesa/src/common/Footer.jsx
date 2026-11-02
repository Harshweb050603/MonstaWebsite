import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <>
        <div className="container max-w-7xl mx-auto grid grid-cols-4 gap-6 border-gray-200 border-b-1 pb-3 mt-15">
          <div className='Contact_us'>
            <h1 className='text-[22px] pb-5 font-semibold merriweather'>Contact Us</h1>
            <p className='text-[#696B69] pb-2'>Address: Claritas est etiam processus dynamicus</p>
            <p className='text-[#696B69] pb-2'>Phone: 98745612330</p>
            <p className='text-[#696B69] pb-2'>Email: furniture@gmail.com</p>
            <div className='social_links mt-2'>
              <ul className='flex flex-row items-stretch gap-3'>
                <li className='text-center  border-1 border-gray-300 w-12 h-12 rounded-full p-2 hover:text-[#C09578]  text-gray-500'><a href=""><i class="fa-brands fa-facebook-f"></i></a></li>
                <li className='text-center  border-1 border-gray-300 w-12 h-12 rounded-full p-2 hover:text-[#C09578] text-gray-500'><a href=""><i class="fa-brands fa-instagram"></i></a></li>
                <li className='text-center  border-1 border-gray-300 w-12 h-12 rounded-full p-2 hover:text-[#C09578] text-gray-500'><a href=""><i class="fa-brands fa-twitter"></i></a></li>
                <li className=' text-center border-1 border-gray-300 w-12 h-12 rounded-full p-2 hover:text-[#C09578] text-gray-500'><a href=""><i class="fa-brands fa-youtube"></i></a></li>
                <li className='text-center  border-1 border-gray-300 w-12 h-12 rounded-full p-2 hover:text-[#C09578] text-gray-500'><a href=""><i class="fa-brands fa-telegram"></i></a></li>
              </ul>
            </div>
          </div>
          <div className='Information merriweather'> 
            <h1 className='text-[22px] pb-5 font-semibold merriweather'>Information</h1>
            <ul>
              <li className='pb-2 text-[#696B69] hover:text-[#C09578]'><a href="">About Us</a></li>
               <li className='pb-2 text-[#696B69] hover:text-[#C09578]'><a href="">Contact Us</a></li>
                <li className='pb-2 text-[#696B69] hover:text-[#C09578]'><a href="">Frequently Question</a></li>
            </ul>
            </div>
          <div className=' MyAccount merriweather'>
            <h1 className='text-[22px] pb-5 font-semibold merriweather'>My Account</h1>
             <ul>
              <li className='pb-2 text-[#696B69] hover:text-[#C09578]'><a href="">My Dashboard</a></li>
               <li className='pb-2 text-[#696B69] hover:text-[#C09578]'><a href="">Wishlist</a></li>
                <li className='pb-2 text-[#696B69] hover:text-[#C09578]'><a href="">Cart</a></li>
                 <li className='pb-2 text-[#696B69] hover:text-[#C09578]'><a href="">CheckOut</a></li>
            </ul>
            </div>
          <div className=' TopRated merriweather'>
             <h1 className='text-[22px] pb-5 font-semibold merriweather'>Top Rated Products </h1>
             <div className='flex flex-col'>
              <div className='flex flex-row border-b-2 border-gray-300 pb-3'>
                   <div className='basis-[30%] pr-2'>
                    <img 
                    src="public/photos/Online Furniture in India/Caroline Study Tables__.jpg" 
                    alt="caroline table"
                    className='w-full object-cover' />
                    </div>
                    <div className='p-2 basis-[70%] top_rated'>
                          <p className='pb-2 cursor-pointer'>Nest of Tables</p>
                          <a className='text-[15px] text-blue-300 hover:text-[#C09578] cursor-pointer'>Caroline Study Tables</a> <br />
                          <div className='mt-1'>
                             <span className='pr-2  line-through'>Rs 3,000</span>
                          <span className='text-[#C09578]'>Rs. 2,500</span>
                          </div>
                         
                    </div>
                <div>

                </div>
              </div>
              <div className='flex flex-row  pb-3 mt-4'>
                   <div className='basis-[30%] pr-2'>
                    <img 
                    src="public/photos/Online Furniture in India/Caroline Study Tables__.jpg" 
                    alt="caroline table"
                    className='w-full object-cover' />
                    </div>
                    <div className='p-2 basis-[70%] top_rated'>
                          <p className='pb-2 cursor-pointer'>Nest of Tables</p>
                          <a className='text-[15px] text-blue-300 hover:text-[#C09578] cursor-pointer'>Caroline Study Tables</a> <br />
                          <div className='mt-1'>
                             <span className='pr-2  line-through'>Rs 3,000</span>
                          <span className='text-[#C09578]'>Rs. 2,500</span>
                          </div>
                         
                    </div>
                <div>

                </div>
              </div>
               
             </div>
          </div>
        </div>
        <div className='container max-w-7xl mx-auto flex justify-center  py-4 border-gray-200 border-b-1'>
          <ul className='flex justify-center gap-10'>
            <li className='text-[20px]  hover:text-[#C09578]'>
              <Link to={'/'}>Home</Link>
            </li>
             <li className='text-[20px]   hover:text-[#C09578]'>
             <Link to={'/Privacy_policy'}>Privacy Policy</Link>
              </li>
              <li className='text-[20px]  hover:text-[#C09578]'>
              <Link to={'/Categoires'}>Online Store</Link>
                </li>
               <li className='text-[20px]  hover:text-[#C09578]'>
                <Link to={'/TermsOfuse'}>Terms Of Use</Link>
                </li>
          </ul>
        </div>
        <div className='container mx-auto max-w-7xl text-center py-12'>
            <p className='pb-3'>All Rights Reserved By Furniture | © 2026</p>
            <div className='w-[200px] flex items-center mx-auto mt-2'>
              <img src="public/photos/Online Furniture in India/footer.png" alt="" 
              className='w-full object-cover'/>
            </div>
        </div>  
    </>
  )
}

