
import Header from './Header'
import Footer from './Footer'
import CommonHeading from './CommonHeading'
import { useState, useEffect } from "react";
import api from "@/services/api";

export default function MywishList() {
 
  const [wishlistProducts, setWishlistProducts] = useState([]);
  useEffect(() => {
  const fetchWishlist = async () => {
    try {
      const response = await api.get("/api/wishlist");

      setWishlistProducts(response.data.wishlist?.products || []);

    } catch (error) {
      console.log("Wishlist fetch error:", error);
    }
  };

  fetchWishlist();
}, []);
  const handleRemoveWishlist = async (productId) => {
  try {
    await api.delete(`/api/wishlist/remove/${productId}`);

    setWishlistProducts((prevProducts) =>
      prevProducts.filter((product) => product._id !== productId)
    );

  } catch (error) {
    console.log("Remove wishlist error:", error);
  }
};
  return (
    <>
      <Header />
      <CommonHeading
        title='My WhishList'
        pageName='My WishList'
      />
     
      {
        wishlistProducts.length > 0 ? (


    
      <div className="container mx-auto px-4 py-10">

        <div className="w-full max-w-7xl mx-auto">
        
          {wishlistProducts.map((product) => (
            <div
              key={product.id}
              className="grid grid-cols-[100px_40px_2fr_1fr_1fr_160px] items-center gap-5 py-6"
            >

              {/* 1. Image */}
              <div>
                <img
                 src={`http://localhost:3000/uploads/${encodeURIComponent(product.image)}`}
                  alt={product.name}
                  className="w-24 h-24 object-cover"
                />
              </div>

              {/* 2. Remove */}
              <div>
                <button className="text-gray-400 hover:text-red-500 text-xl"
                 onClick={() => handleRemoveWishlist(product._id)}>
                  ×
                </button>
              </div>

              {/* 3. Name */}
              <div>
                <h3 className="text-gray-800 font-medium">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-400 mt-1">
                  {product.category}
                </p>
              </div>

              {/* 4. Price */}
              <div>
                <p className="font-semibold text-[#C09578]">
                  ₹{product.price.toLocaleString("en-IN")}
                </p>
              </div>

              {/* 5. Stock */}
              <div>
                <p className="text-sm text-green-600">
                  In Stock
                </p>
              </div>

              {/* 6. Add to Cart */}
              <div>
                <button className="bg-[#C09578] text-white px-5 py-3 text-xs tracking-wider hover:bg-[#A77D61] transition">
                  ADD TO CART
                </button>
              </div>

            </div>
          ))}

        </div>
      </div> ): ( <div className='w-full  flex justify-center items-center mt-10 py-10 border-b-1 border-gray-300'>
        <div className="conatiner mx-auto flex flex-col justify-center items-center">
          <div className='max-w-xl'>
            <img src="public/photos/Online Furniture in India/Wishlist-Empty.jpg " alt=" WishList"
              className='w-full mx-auto object-coever object-center' />
          </div>
          <p className='text-center'>Your Wish List is Empty</p>
        </div>

      </div>)
}
      <Footer />

    </>
  )
}
