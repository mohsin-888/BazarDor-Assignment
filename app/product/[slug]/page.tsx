import { auth } from "../../../auth";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { connection } from "next/server";
export const instant = false;
const banglaNumber = (value: number) => {
  return new Intl.NumberFormat("bn-BD", {
    maximumFractionDigits: 1,
  }).format(value);
};

const unitBn = (unit: string) => {
  const units: Record<string, string> = {
    kg: "কেজি",
    litre: "লিটার",
    liter: "লিটার",
    dozen: "ডজন",
    piece: "পিস",
    pcs: "পিস",
  };

  return units[unit?.toLowerCase()] || unit;
};

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  await connection();

const { slug } = await params;

// Login Protection
  // Login Protection
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect(
      `/signin?protected=true&redirect=/product/${slug}`
    );
  }

  // First find product by slug or ID
  const productsResponse = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/products",
    {
      cache: "no-store",
    }
  );

  if (!productsResponse.ok) {
    notFound();
  }

  const data = await productsResponse.json();

  const products = Array.isArray(data)
    ? data
    : data.products || data.data || [];

  const foundProduct = products.find(
    (item: any) =>
      String(item.id) === String(slug) ||
      item.slug === slug
  );

  if (!foundProduct) {
    notFound();
  }

  // Get complete product details
  const detailsResponse = await fetch(
    `https://api.abcz.workers.dev/api/bazardor/products/${foundProduct.id}`,
    {
      cache: "no-store",
    }
  );

  if (!detailsResponse.ok) {
    notFound();
  }

  const product = await detailsResponse.json();

  const markets = product.markets || [];

  const minimumPrice =
    markets.length > 0
      ? Math.min(
          ...markets.map((market: any) =>
            Number(market.min)
          )
        )
      : Number(product.today || 0);

  const maximumPrice =
    markets.length > 0
      ? Math.max(
          ...markets.map((market: any) =>
            Number(market.max)
          )
        )
      : Number(product.today || 0);

  const averagePrice =
    markets.length > 0
      ? Math.round(
          markets.reduce(
            (sum: number, market: any) =>
              sum +
              (Number(market.min) +
                Number(market.max)) /
                2,
            0
          ) / markets.length
        )
      : Number(product.today || 0);

  const change = Number(
    product.change?.pct || 0
  );

  const direction =
    product.change?.dir || "flat";

  return (
    <main className="min-h-[70vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-6xl">

        {/* Product Header */}
        <section className="rounded-2xl bg-white p-6 shadow-sm md:p-8">

          <div className="flex flex-col gap-6 md:flex-row md:items-center">

            <div className="flex h-28 w-28 items-center justify-center rounded-2xl bg-green-50 text-7xl">
              {product.image || "🛒"}
            </div>

            <div className="flex-1">

              <p className="text-sm font-semibold text-green-700">
                {product.categoryIcon}{" "}
                {product.categoryNameBn}
              </p>

              <h1 className="mt-2 text-4xl font-bold text-gray-900">
                {product.nameBn}
              </h1>

              <p className="mt-2 text-gray-500">
                প্রতি {unitBn(product.unit)}
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">

                <p className="text-3xl font-bold text-green-700">
                  {banglaNumber(
                    Number(product.today)
                  )}{" "}
                  টাকা
                </p>

                {direction === "up" ? (
                  <span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-700">
                    ▲ {banglaNumber(change)}%
                  </span>
                ) : direction === "down" ? (
                  <span className="rounded-full bg-red-100 px-3 py-1 font-semibold text-red-600">
                    ▼ {banglaNumber(change)}%
                  </span>
                ) : (
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                    — ০%
                  </span>
                )}

              </div>

            </div>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-8">

          <h2 className="text-2xl font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                আজকের দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-green-700">
                {banglaNumber(
                  Number(product.today)
                )}{" "}
                টাকা
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {banglaNumber(minimumPrice)} টাকা
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {banglaNumber(maximumPrice)} টাকা
              </p>
            </div>

            <div className="rounded-xl bg-white p-5 shadow-sm">
              <p className="text-sm text-gray-500">
                গড় দাম
              </p>

              <p className="mt-2 text-2xl font-bold text-gray-900">
                {banglaNumber(averagePrice)} টাকা
              </p>
            </div>

          </div>
        </section>

        {/* Previous Price */}
        <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">

          <h2 className="text-2xl font-bold text-gray-900">
            আগের বাজারদর
          </h2>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                গতকাল
              </p>

              <p className="mt-1 text-xl font-bold">
                {banglaNumber(
                  Number(product.yesterday)
                )}{" "}
                টাকা
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                গত সপ্তাহে
              </p>

              <p className="mt-1 text-xl font-bold">
                {banglaNumber(
                  Number(product.lastWeek)
                )}{" "}
                টাকা
              </p>
            </div>

            <div className="rounded-xl bg-gray-50 p-4">
              <p className="text-sm text-gray-500">
                গত মাসে
              </p>

              <p className="mt-1 text-xl font-bold">
                {banglaNumber(
                  Number(product.lastMonth)
                )}{" "}
                টাকা
              </p>
            </div>

          </div>
        </section>

        {/* Market Prices */}
        <section className="mt-8">

          <h2 className="text-2xl font-bold text-gray-900">
            বাজারভিত্তিক দাম
          </h2>

          <p className="mt-2 text-gray-500">
            বিভিন্ন বাজারে সর্বনিম্ন ও সর্বোচ্চ দাম
          </p>

          <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200 bg-white">

            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="px-5 py-4 text-left">
                      বাজার
                    </th>

                    <th className="px-5 py-4 text-left">
                      বিভাগ
                    </th>

                    <th className="px-5 py-4 text-left">
                      সর্বনিম্ন
                    </th>

                    <th className="px-5 py-4 text-left">
                      সর্বোচ্চ
                    </th>
                  </tr>
                </thead>

                <tbody>

                  {markets.map(
                    (
                      market: any,
                      index: number
                    ) => (
                      <tr
                        key={index}
                        className="border-b border-gray-100 last:border-0"
                      >

                        <td className="px-5 py-4 font-semibold text-gray-900">
                          {market.market}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {market.division}
                        </td>

                        <td className="px-5 py-4 text-gray-700">
                          {banglaNumber(
                            Number(market.min)
                          )}{" "}
                          টাকা
                        </td>

                        <td className="px-5 py-4 text-gray-700">
                          {banglaNumber(
                            Number(market.max)
                          )}{" "}
                          টাকা
                        </td>

                      </tr>
                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export default ProductDetailsPage;