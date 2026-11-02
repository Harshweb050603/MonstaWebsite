import React, { useState } from 'react'
import Header from '../common/Header'
import { Link } from 'react-router-dom'
import Footer from '../common/Footer'
import Frequentlyitems from '../components/Frequentlyitems'
import CommonHeading from '../common/CommonHeading'

export default function Frequently_question() {
  
  return (
    <>
    <Header/>
       <CommonHeading
                title={'Frequently Questions'}
                pageName={'Frequently Questions'} />
            <div className="container mt-8 mx-auto max-w-7xl border-b-1 border-gray-300 py-10">
             {
              [1,2,3,4,5].map(()=>{
                return <Frequentlyitems/>
              })
             }
             
            </div>
            <Footer/>
    </>
  )
}
