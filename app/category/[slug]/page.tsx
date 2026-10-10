"use client";

import { Suspense, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ProductCard from "../../../components/ProductCard";
import ProductCardSkeleton from "../../../components/ProductCardSkeleton";

const CategoryContent = () => {
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : params.slug;

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("default");

  useEffect(() => {
    if (!slug) return;

    setLoading(true);

    fetch(
      `https://api.abcz.workers.dev/api/bazardor/products?category=${slug}`
    )
      .then((res) => res.json())
      .then((data) => {
        const productList = Array.isArray(data)
          ? data
          : data.products || data.data || [];

        setProducts(productList);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Category Error:", error);
        setProducts([]);
        setLoading(false);
      });
  }, [slug]);

  const bengaliToEnglish = (value: any) => {
    const banglaDigits = "০১২৩৪৫৬৭৮৯";
    const englishDigits = "0123456789";

    return String(value ?? "")
      .replace(/[০-৯]/g, (digit) => {
        return englishDigits[
          banglaDigits.indexOf(digit)
        ];
      })
      .replace(/,/g, "");
  };

  const getPrice = (product: any) => {
    return Number(
      bengaliToEnglish(product.today)
    ) || 0;
  };

  const sortedProducts = [...products];

  if (sort === "low") {
    sortedProducts.sort(
      (a, b) => getPrice(a) - getPrice(b)
    );
  }

  if (sort === "high") {
    sortedProducts.sort(
      (a, b) => getPrice(b) - getPrice(a)
    );
  }

  if (loading) {
    return (
      <main className="min-h-[70vh] bg-gray-50 px-4 py-12">
        <div className="mx-auto max-w-6xl">
          <div className="h-10 w-52 animate-pulse rounded bg-gray-200"></div>

          <div className="mt-3 h-5 w-72 animate-pulse rounded bg-gray-200"></div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </main>
    );
  }

  if (products.length === 0) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="text-6xl">🛒</div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            কোনো পণ্য পাওয়া যায়নি
          </h1>

          <p className="mt-2 text-gray-500">
            এই ক্যাটাগরিতে বর্তমানে কোনো পণ্য নেই।
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white"
          >
            সব পণ্য দেখুন
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              🛒 {slug} ক্যাটাগরি
            </h1>

            <p className="mt-2 text-gray-500">
              এই ক্যাটাগরির সর্বশেষ বাজারদর
            </p>
          </div>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 outline-none focus:border-green-600"
          >
            <option value="default">
              ডিফল্ট
            </option>

            <option value="low">
              দাম: কম থেকে বেশি
            </option>

            <option value="high">
              দাম: বেশি থেকে কম
            </option>
          </select>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {sortedProducts.map((product, index) => (
            <ProductCard
              key={product.id || index}
              product={product}
            />
          ))}
        </div>

      </div>
    </main>
  );
};

const CategoryPage = () => {
  return (
    <Suspense
      fallback={
        <main className="min-h-[70vh] bg-gray-50 px-4 py-12">
          <div className="mx-auto max-w-6xl">
            <div className="h-10 w-52 animate-pulse rounded bg-gray-200"></div>

            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          </div>
        </main>
      }
    >
      <CategoryContent />
    </Suspense>
  );
};

export default CategoryPage;