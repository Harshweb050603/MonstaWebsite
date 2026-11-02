'use client'
import { useState , useEffect } from 'react'
import Header from '../common/Header'
import Footer from '../common/Footer'
import CommonHeading from '../common/CommonHeading'
import PhysicalProductWithVariants from './grit-ui/product-details/physical-product-with-variants'
import Bestselliing_products from '../common/Bestselliing_products.jsx'
import { useParams, useLocation } from 'react-router-dom';

import ProductDetailsSkeleton from '@/common/ProductDetailsSkeleton'
import api from '@/services/api.jsx'
export default function ProductDetails() {

   const { id } = useParams();

    const location = useLocation();

    const products = location.state?.products || [];
    console.log("Products received:", location.state);
    console.log("Related products:", products);

    const [singleProductDetails, setSingleProductDetails] = useState(null);

      useEffect(() =>{
       api.get(`/api/product/getProduct/${id}`)
        .then(response => {
          setSingleProductDetails(response.data.product);
        }).catch(error => {
          console.error('Error fetching product details:', error);
        });
      } ,[id])


         if (!singleProductDetails) {

        return <ProductDetailsSkeleton/>;
    }
  
  return (
    <>
      <Header/>
      <CommonHeading
      title={singleProductDetails.name}
      pageName={'Product Listing'}/>
      <div className='w-full'>
        <PhysicalProductWithVariants singleProductDetails={singleProductDetails} />
       
            <div className="container w-full mt-5 mx-auto">
              <Bestselliing_products
              title='Related Products'
               products={products}
              
               />
               <Bestselliing_products
              title='Upsell Products'
               products={products}/>

            </div>
      </div>
            
      <Footer/>
    </>
  )
}
