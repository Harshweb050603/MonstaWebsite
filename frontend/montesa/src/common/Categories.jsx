import React, { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { Link } from 'react-router-dom'
import Card from '../components/Card';

export default function Categories() {
    const [price, setPrice] = useState(5000);
    const [sortshow, setSortshow] = useState(false)
    return (
        <>
            <Header />
            <div className='container mx-auto max-w-7xl py-15 text-center border-gray-300 border-b-1'>
                <h1 className='text-center text-4xl about-heading font-bold'>Top Rated</h1>
                <span className='p-2 inline-block text-[18px] font-400'>
                    <Link to={'/'}>Home</Link> < span className=' inline-block text-[#C09578] pl-2'>Top Rated</span>
                </span>
            </div>
            <div className="container max-w-7xl mx-auto py-5">
                <div className="max-w-7xl mx-auto flex gap-5  ">
                    <div className="basis-[25%]  ">
                        <div className='py-2 h-[500px] overflow-y-auto scrollbar border-b-1 border-gray-300 py-6'>
                            <h1 className='py-3 text-[28px] about-heading font-bold '>Categories</h1>
                            <p className='about-heading text-[25px] text-gray-600 py-3'>test</p>
                            <ul className=''>
                                <li className='about-heading text-[25px] text-gray-600 font-semibold '>Tables</li>
                                {
                                    [1, 2, 3, 4, 5].map(() => {
                                        return <li className='flex gap-3 items-center py-3 text-[#5a5a5a] font-medium text-[18px]'> <input type="checkbox" className="w-5 h-5 cursor-pointer border-t-2 border-b-2 border-[#88] rounded-xl" value={28} /> <span>Side and End Tables</span> </li>
                                    })
                                }
                                <li className=' font-semibold about-heading text-[25px] text-gray-600 py-2'>Mirror</li>
                                {
                                    [1, 2].map(() => {
                                        return <li className='flex gap-3 items-center py-3 text-[#5a5a5a] font-medium text-[18px]'> <input type="checkbox" className="w-5 h-5 cursor-pointer border-t-2 border-b-2 border-[#88] rounded-xl" value={28} /> <span>Fancy mirror</span> </li>
                                    })
                                }
                                <li className=' font-semibold about-heading text-[25px] text-gray-600 py-2'>Living Storage/collections</li>
                                {
                                    [1, 2, 3, 4, 5, 6, 7].map(() => {
                                        return <li className='flex gap-3 items-center py-3 text-[#5a5a5a] font-medium text-[18px]'> <input type="checkbox" className="w-5 h-5 cursor-pointer border-t-2 border-b-2 border-[#88] rounded-xl" value={28} /> <span>Prayer Units</span> </li>
                                    })
                                }
                                <li className=' font-semibold about-heading text-[25px] text-gray-600 py-2'>Sofa Cum Bed</li>
                                {
                                    [1].map(() => {
                                        return <li className='flex gap-3 items-center py-3 text-[#5a5a5a] font-medium text-[18px]'> <input type="checkbox" className="w-5 h-5 cursor-pointer border-t-2 border-b-2 border-[#88] rounded-xl" value={28} /> <span>Wooden Sofa Cum Bed</span> </li>
                                    })
                                }
                                <li className='font-semibold about-heading text-[25px] text-gray-600 py-2'>Sofa Sets</li>
                                {
                                    [1].map(() => {
                                        return <li className='flex gap-3 items-center py-3 text-[#5a5a5a] font-medium text-[18px]'> <input type="checkbox" className="w-5 h-5 cursor-pointer border-t-2 border-b-2 border-[#88] rounded-xl" value={28} /> <span>L Shape Sofa</span> </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='Material border-b-1 border-gray-300 mt-4 py-7 '>
                            <h1 className='py-3 text-[28px] about-heading font-bold '>Material</h1>
                            <ul className=''>
                                {
                                    [1, 2, 3, 4, 5, 7, 8, 9].map(() => {
                                        return <li className='flex gap-3 items-center py-3 text-[#5a5a5a] font-medium text-[18px]'> <input type="checkbox" className="w-5 h-5 cursor-pointer border-t-2 border-b-2 border-[#88] rounded-xl" value={28} /> <span>Rose Wood</span> </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className='color border-b-1 border-gray-300 mt-4 py-7'>
                            <h1 className='py-3 text-[28px] about-heading font-bold '>Color</h1>
                            <ul>
                                {
                                    [1, 2, 3, 4, 5].map(() => {
                                        return <li className='flex gap-3 items-center py-3 text-[#5a5a5a] font-medium text-[18px]'> <input type="checkbox" className="w-5 h-5 cursor-pointer border-t-2 border-b-2 border-[#88] rounded-xl" value={28} /> <span>Burnt Amber</span> </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="filter_price mt-4 py-4">
                            <h1 className='py-3 text-[28px] about-heading font-bold'>Filter By Price</h1>
                            <div className="w-full max-w-sm p-4">
                                <h2 className="text-xl font-semibold mb-4">
                                    Filter by Price
                                </h2>

                                <input
                                    type="range"
                                    min="0"
                                    max="50000"
                                    step="500"
                                    value={price}
                                    onChange={(e) => setPrice(Number(e.target.value))}
                                    className="w-full accent-[#C09578] cursor-pointer"
                                />


                                <p className="mt-4 text-[#364153]">
                                    <b>Rs. {price.toLocaleString('en-IN')}</b>
                                    <b className='pl-2'>- Rs. 500000</b>
                                </p>
                                <button className='py-2 px-3 w-20 mt-2 border-none cursor-pointer bg-[#364153] text-white hover:bg-[#C09578] '>
                                    Filter
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="basis-[72%]  py-2">
                        <div className='p-4 border-gray-200 border flex flex-row-reverse gap-4 items-center'>
                            <p className=''>
                                Showing 1–12 of 18 results
                            </p>
                            <div className='  border-gray-400 cursor-pointer'>

                                <ul className="relative">
                                    <li
                                        onClick={() => setSortshow(!sortshow)}
                                        className="border border-gray-400 px-4 py-2 cursor-pointer font-semibold"
                                    >
                                        Sort By

                                        <ul
                                            className={`absolute left-0 top-full z-50 w-[200px] overflow-hidden border border-gray-400 bg-white rounded-t-lg transition-all duration-300 mt-2 ease-in-out ${sortshow
                                                    ? 'visible opacity-100 translate-y-0'
                                                    : 'invisible opacity-0 -translate-y-2'
                                                }`}
                                        >
                                            <li className='font-bold p-3  cursor-pointer" bg-[#F6F6F6]'>Sort By</li>
                                            {[
                                                'Default',
                                                'Popularity',
                                                'Latest',
                                                'Price: Low to High',
                                                'Price: High to Low',
                                                'Rating'
                                            ].map((item) => (
                                                <li
                                                    key={item}
                                                    className="p-3 hover:bg-[#F6F6F6] cursor-pointer"
                                                >
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>

                            </div>
                            <p className='  text-gray-600 about-heading'>
                                Sort by:
                            </p>
                        </div>
                        <div className=' p-4 flex flex-row gap-1'>
                            <div className='grid grid-cols-3 gap-4'>
                                {
                                [1,2,3,4,5,6,7,8,9,10,11,12].map(()=>{
                                    return(
                                        <Card/>
                                    )
                                })
                               }    
                            </div>
                                            
                        </div>
                        <div className='p-3 mt-2 mb-2 flex justify-center  border-1 border-gray-300'>
                            <ul className='flex justify-center gap-1'>
                                <li className='p-1 px-2 bg-gray-300 rounded  w-[80px] text-center'>Previous</li>
                                <li className='p-1 px-2 bg-[#C09578] text-white cursor-pointer  rounded'>1</li>
                                 <li className='p-1 px-2 bg-gray-300 hover:bg-[#C09578] text-black cursor-pointer rounded'>2</li>
                                 <li className=' hover:bg-[#C09578] p-1 px-2 bg-gray-300 rounded cursor-pointer text-center w-[80px]'> Next</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
