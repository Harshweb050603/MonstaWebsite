import React, { useState } from 'react'

export default function Frequentlyitems() {
    let [showans, setShowans] = useState(true)
    return (
        <>

            <div className="frequently-items  mb-5 ">
                <div
                    className={`Question p-2 py-4 bg-[#F2F2F2] flex justify-between cursor-pointer rounded items-center ${showans ? '' : 'border border-[#C09578] tex-[#C09578]'}`}
                    onClick={() => setShowans(!showans)}
                >
                    <h1 className={`font-bold ${showans ? '' : ' text-[#C09578]'}`}>Q1. What is Your Name?</h1>
                    <span className=''>{showans ? <i className="fa-solid fa-plus text-gray-400"></i> : <i className="fa-solid fa-minus text-gray-400"></i>}</span>
                </div>

                <div
                    className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${showans ? 'grid-rows-[0fr]' : 'grid-rows-[1fr] border border-[#C09578]'
                        }`}
                >
                    <div className="overflow-hidden">
                        <div
                            className={`p-2 transition-opacity duration-500 ${showans ? 'opacity-0' : 'opacity-100'
                                }`}
                        >
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Animi nulla, voluptas nesciunt a, exercitationem placeat
                                explicabo error ad tenetur ipsa quia, sunt possimus ratione id temporibus modi.
                                Facilis, ex optio.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
