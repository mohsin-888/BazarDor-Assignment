const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="h-12 w-12 rounded-lg bg-gray-200"></div>

      <div className="mt-4 h-6 w-2/3 rounded bg-gray-200"></div>

         <div className="mt-2 h-4 w-1/3 rounded bg-gray-200"></div>

    <div className="mt-5 border-t border-gray-100 pt-4">
        <div className="h-4 w-24 rounded bg-gray-200"></div>

        <div className="mt-3 flex items-center justify-between">
          <div className="h-7 w-28 rounded bg-gray-200"></div>
          <div className="h-7 w-16 rounded-full bg-gray-200"></div>
</div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;