"use client";

import { useEffect, useState } from "react";

const PriceTicker = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/bazardor/products")
      .then((res) => res.json())
      .then((data) => {
           const productList = Array.isArray(data)
          ? data
      : data.products || data.data || [];

        setProducts(productList);
      })
      .catch((error) => {
        console.log("Ticker Error:", error);
      });
  }, []);

  const banglaNumber = (value: number) => {
    return new Intl.NumberFormat("bn-BD", {
      maximumFractionDigits: 1,
    }).format(value);
  };

  if (products.length === 0) {
    return (
      <div className="bg-green-800 py-2 text-center text-sm text-white">
        বাজারদর লোড হচ্ছে...
      </div>
    );
  }

  const tickerProducts = [
    ...products,
    ...products,
  ];
 return (
    <div className="overflow-hidden bg-green-800 py-2 text-white">
      <div className="ticker flex w-max items-center">

        {tickerProducts.map(
          (product, index) => {
            const name =
               product.nameBn ||
              product.name ||
              "পণ্য";

            const emoji =
              product.image ||
               product.emoji ||
              "🛒";

            const price = Number(
              product.today || 0
            );

            const change = Number(
              product.change?.pct || 0
            );

             const direction =
              product.change?.dir || "flat";

            return (
               <div
                 key={`${product.id || index}-${index}`}
                className="mx-6 flex items-center gap-2 whitespace-nowrap text-sm"
              >
                <span className="text-lg">
                  {emoji}
                </span>

                <span className="font-semibold">
                  {name}
                </span>

                <span>
                  {banglaNumber(price)} টাকা
                  {product.unit
                    ? `/${product.unit}`
                      : ""}
                </span>

                {direction === "up" ? (
                  <span className="font-bold text-lime-300">
                    ▲ {banglaNumber(change)}%
                  </span>
                ) : direction === "down" ? (
                  <span className="font-bold text-red-300">
                    ▼ {banglaNumber(change)}%
                  </span>
                ) : (
                  <span className="text-gray-300">
                    — ০%
                              </span>
                )}
              </div>
            );
          }
        )}

      </div>

      <style jsx>{`
        .ticker {
          animation: ticker 35s linear infinite;
        }

        @keyframes ticker {
          from {
           transform: translateX(0);
          }

         to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
};

export default PriceTicker;