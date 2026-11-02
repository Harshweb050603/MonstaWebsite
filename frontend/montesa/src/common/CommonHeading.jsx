
import { Link } from 'react-router-dom'

export default function CommonHeading({title,pageName}) {
  return (
    <div>
       <div className='container mx-auto max-w-7xl py-15 text-center border-gray-300 border-b-1'>
                    <h1 className='text-center text-4xl about-heading font-bold'>{title}</h1>
                    <span className='p-2 inline-block text-[18px] font-400'>
                        <Link to={'/'}>Home</Link> < span className=' inline-block text-[#C09578] pl-2'>{pageName}</span>
                    </span>
                </div>
    </div>
  )
}
