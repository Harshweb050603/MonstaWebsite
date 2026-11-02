
import { Link } from 'react-router-dom'

export default function Card({ product , products }) {
   
  return (
    <>
     <Link
  to={`/ProductDetails/${product._id}`}
  state={{ products }}
  className="card mb-5 pb-5"
>
            <div className='peoduct_img pb-2'>
                <img src={`http://localhost:3000/uploads/${product.image}`} alt="study tables" className='w-full' />
            </div>
            <div className='product_content'>
                <div className='text-center   p-2'>
                    <p className=' text-decoration-none text-reset'>{product.category}</p>
                </div>
                <h3 className='text-center '>
                    <Link  to={`/ProductDetails/${product._id}`}
                     className='text-decoration-none text-reset'>{product.name}</Link>
                </h3>
                <div className='price text-center'>
                    <span className='line-through text-[20px] pr-2'>Rs. 3,000</span>
                    <span className='text-[#C09578] font-bold text-[20px]'>{product.price}</span>
                </div>
                <div className='action_links m-auto pt-2'>
                    <ul className=' flex gap-2 m-auto justify-center '>
                        <li className='p-2 bg-[#F1F1F1] hover:bg-[#C09578]'>
                           <i className="fa-regular fa-heart text-[20px]"></i>
                        </li>
                        <li className='p-2  bg-[#F1F1F1] hover:bg-[#C09578]'>
                            Add to Cart
                        </li>
                    </ul>
                </div>
            </div>
      </Link>
      
    </>
  )
}
