


const CURRENCY = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' })







export default function PhysicalProductWithVariants({
 singleProductDetails,
 

 
}) {
 
  return (
    <section className="bg-white py-8 dark:bg-gray-950">
      <div className="mx-auto max-w-6xl p-4 md:p-8">
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="md:w-1/2">
            <div className=" overflow-hidden rounded-xl  dark:bg-white/5">
              <img
                src={`http://localhost:3000/uploads/${singleProductDetails.image}`}
                alt={singleProductDetails.name}
                className="size-full object-contain p-4"
              />
            </div>

          </div>

          <div className="md:w-1/2 align-items">
            

            <h2 className="text-3xl font-bold tracking-tight text-balance text-gray-900 dark:text-white p-4">
              {singleProductDetails.name}
            </h2>

           

            <p className="mt-4 flex items-baseline gap-3 px-4">
              <span className="text-3xl font-bold text-gray-900 tabular-nums dark:text-white">
                {CURRENCY.format(singleProductDetails.price)}
              </span>
              {singleProductDetails.discount > singleProductDetails.price && (
                <span className="text-lg text-gray-500 line-through tabular-nums dark:text-gray-400">
                  <span className="sr-only">Was </span>
                  {CURRENCY.format(singleProductDetails.discount)}
                </span>
              )}
            </p>

            <p className="mt-4 px-4 text-base/7 text-gray-600 dark:text-gray-400">{singleProductDetails.description}</p>

            <dl className="mt-6 space-y-3 border-t border-gray-200 pt-6 text-sm dark:border-white/10">
              
             
            </dl>

            <button className="mt-6 bg-[#C09578] text-white py-2 px-4 w-1/2 h-10 hover:bg-black cursor-pointer transition-colors duration-300">
              Add to Cart
            </button>

            <ul>
              <li className="mt-6 text-[17px] text-[#332230] dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Code:</span> {singleProductDetails.code}
              </li>
              <li className="mt-6 text-[17px] text-[#332230] dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Dimension</span> {singleProductDetails.dimension}
              </li>
              <li className="mt-6 text-[17px]  text-[#332230] dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  Category
                  </span> {singleProductDetails.category}
              </li>
              <li className="mt-6 text-[17px] text-[#332230] dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">Color:</span> {singleProductDetails.color}
              </li>
              <li className="mt-6 text-[17px] text-[#332230] dark:text-gray-400">
                <span className="font-medium text-gray-700 dark:text-gray-300">material:</span> {singleProductDetails.materials}
              </li>
             
            </ul>


          </div>
        </div>
         <div className='max-w-7xl mx-auto mt-5 py-12'>
                  <h1 className='py-2 border-gray-300 border-b-1 font-bold text-[28px] text-[#C09778]'>Description</h1>
                  <p className='mt-12 text-[#212121] leading-7'>{singleProductDetails.description}</p>
                </div>
      </div>
    </section>
  )
}
