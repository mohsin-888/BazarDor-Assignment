"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const ProductSection = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        setProducts(productList);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const getChange = (product: any) => {
    return Number(product.change?.pct || 0);
  };

  const risers = [...products]
    .filter(
      (product) =>
        product.change?.dir === "up"
    )
    .sort(
      (a, b) =>
        getChange(b) - getChange(a)
    )
    .slice(0, 6);

  const fallers = [...products]
    .filter(
      (product) =>
        product.change?.dir === "down"
    )
    .sort(
      (a, b) =>
        getChange(b) - getChange(a)
    )
    .slice(0, 6);

  if (loading) {
    return (
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="h-9 w-56 animate-pulse rounded bg-gray-200"></div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <ProductCardSkeleton
      key={index}
                />
              )
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="bg-white">

      <section className="px-4 py-14">
        <div className="mx-auto max-w-6xl">

          <h2 className="text-3xl font-bold text-green-700">
            আজ দাম বেড়েছে ▲
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {risers.map(
              (product, index) => (
                <ProductCard
                  key={product.id || index}
                  product={product}
                />
              )
            )}
          </div>

        </div>
      </section>
      <section className="bg-red-50 px-4 py-14">
        <div className="mx-auto max-w-6xl">

          <h2 className="text-3xl font-bold text-red-600">
            আজ দাম কমেছে ▼
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fallers.map(
              (product, index) => (
                <ProductCard
                  key={product.id || index}
                  product={product}
                />
              )
            )}
          </div>

        </div>
      </section>
      <section
        id="সব-পণ্য"
        className="px-4 py-16"
      >
        <div className="mx-auto max-w-6xl">

          <h2 className="text-3xl font-bold text-gray-900">
            সব পণ্য
         </h2>

          <p className="mt-2 text-gray-500">
          আজকের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর
          </p>

         <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map(
              (product, index) => (
                <ProductCard
                key={product.id || index}
                  product={product}
              />
              )
            )}
        </div>

      </div>
      </section>

    </div>
  );
};

export default ProductSection;