
export default function ProductDetailsSkeleton() {
  return (
    <div className="container mx-auto px-5 py-10 animate-pulse">

      {/* Breadcrumb skeleton */}
      <div className="h-4 bg-gray-200 rounded w-48 mb-10"></div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Product Image */}
        <div className="space-y-4">
          <div className="w-full h-[450px] bg-gray-200 rounded"></div>

          <div className="flex gap-4">
            <div className="w-20 h-20 bg-gray-200 rounded"></div>
            <div className="w-20 h-20 bg-gray-200 rounded"></div>
            <div className="w-20 h-20 bg-gray-200 rounded"></div>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-6">

          {/* Category */}
          <div className="h-4 bg-gray-200 rounded w-28"></div>

          {/* Product Name */}
          <div className="h-9 bg-gray-200 rounded w-3/4"></div>

          {/* Rating */}
          <div className="h-5 bg-gray-200 rounded w-36"></div>

          {/* Price */}
          <div className="h-8 bg-gray-200 rounded w-40"></div>

          {/* Description */}
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>

          {/* Color options */}
          <div className="space-y-3">
            <div className="h-5 bg-gray-200 rounded w-24"></div>
            <div className="flex gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
              <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
              <div className="w-9 h-9 bg-gray-200 rounded-full"></div>
            </div>
          </div>

          {/* Quantity */}
          <div className="h-12 bg-gray-200 rounded w-32"></div>

          {/* Add to Cart */}
          <div className="h-12 bg-gray-200 rounded w-full"></div>

          {/* Product details */}
          <div className="space-y-3 pt-5">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>

        </div>
      </div>
    </div>
  );
}
