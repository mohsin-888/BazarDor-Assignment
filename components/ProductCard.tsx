import Link from "next/link";

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

const ProductCard = ({ product }: { product: any }) => {
  const name = product.nameBn || product.name || "পণ্য";

  const emoji =
    product.image ||
    product.emoji ||
    product.icon ||
    "🛒";

  const price = Number(product.today || 0);

  const change = Number(
    product.change?.pct || 0
  );

  const direction =
    product.change?.dir || "flat";

  const slug =
    product.slug || product.id;

  return (
    <Link href={`/product/${slug}`}>
      <div className="h-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

        <div className="text-5xl">
         {emoji}
        </div>

        <h3 className="mt-4 text-xl font-bold text-gray-900">
          {name}
        </h3>

        <p className="mt-1 text-sm text-gray-500">
          প্রতি {unitBn(product.unit)}
        </p>

        <div className="mt-5 border-t border-gray-100 pt-4">
          <p className="text-sm text-gray-500">
            আজকের দাম
          </p>

        <div className="mt-1 flex items-center justify-between gap-3">

            <p className="text-2xl font-bold text-gray-900">
              {banglaNumber(price)} টাকা
            </p>

          {direction === "up" ? (
              <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">
                ▲ {banglaNumber(change)}%
             </span>
            ) : direction === "down" ? (
             <span className="rounded-full bg-red-100 px-3 py-1 text-sm font-semibold text-red-600">
               ▼ {banglaNumber(change)}%
              </span>
            ) : (
         <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-semibold text-gray-500">
                — ০.০%
              </span>
          )}
         </div>
      </div>
      </div>
    </Link>
  );
};

export default ProductCard;