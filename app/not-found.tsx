import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-4">
      <div className="text-center">

        <div className="text-7xl">
          🛒
        </div>

        <h1 className="mt-5 text-6xl font-bold text-green-700">
          4 0 4
        </h1>

        <h2 className="mt-3 text-2xl font-bold text-gray-900">
          পেজটি পাওয়া যায়নি
        </h2>

        <p className="mt-3 text-gray-500">
         আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে
          অথবা সঠিক লিংক নয় ।
        </p>

        <Link
          href="/"
         className="mt-7 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
        >
          হোমে ফিরে যান
        </Link>

      </div>
    </main>
  );
};

export default NotFoundPage;