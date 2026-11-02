
import Header from '../common/Header'
import Footer from '../common/Footer'

import CommonHeading from '../common/CommonHeading'

export default function Cart() {
  return (
    <>
      <Header/>
       <CommonHeading
                title={'Shopping Cart'}
                pageName={'Shopping Cart'}
                />
            <div className='w-full  flex justify-center items-center mt-10 py-10 border-b-1 border-gray-300'>
              <div className="conatiner mx-auto flex justify-center items-center">
                <div className='max-w-xl'>
                    <img src="public/photos/Online Furniture in India/Shopping.jpg " alt=" ShoppingCart"
                className='w-full mx-auto object-coever object-center' />
                </div>
              </div>
                
            </div>
      <Footer/>
    </>
  )
}
