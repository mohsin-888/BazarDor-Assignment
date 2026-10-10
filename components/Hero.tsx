const Hero = () => {
  return (
    <section className="bg-green-50">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold text-green-700">
            আজকের বাজারদর এক নজরে
          </p>

          <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
            নিত্যপ্রয়োজনীয় পণ্যের
            <span className="block text-green-700">
             সঠিক বাজারদর জানুন
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংসসহ প্রয়োজনীয় পণ্যের
            সর্বশেষ দাম সহজেই দেখুন এবং তুলনা করুন।
         </p>

          <a
            href="#সব-পণ্য"
           className="mt-7 inline-block rounded-lg bg-green-700 px-6 py-3 font-semibold text-white hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </a>
        </div>
       <div className="flex justify-center">
          <div className="flex h-72 w-full max-w-md items-center justify-center rounded-3xl bg-white text-8xl shadow-sm">
           🛒🥦🍚🐟
         </div>
       </div>

      </div>
    </section>
  );
};

export default Hero;