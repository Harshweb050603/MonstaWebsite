
import Header from './Header'
import Footer from './Footer'
import CommonHeading from './CommonHeading'

export default function MywishList() {
  return (
    <>
      <Header/>
      <CommonHeading
      title='My WhishList'
      pageName = 'My WishList'
      />
       <div className='w-full  flex justify-center items-center mt-10 py-10 border-b-1 border-gray-300'>
              <div className="conatiner mx-auto flex flex-col justify-center items-center">
                <div className='max-w-xl'>
                    <img src="public/photos/Online Furniture in India/Wishlist-Empty.jpg " alt=" WishList"
                className='w-full mx-auto object-coever object-center' />
                </div>
                <p className='text-center'>Your Wish List is Empty</p>
              </div>
                
            </div>
      <Footer/>

    </>
  )
}
