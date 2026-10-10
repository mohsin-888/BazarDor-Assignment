const Footer = () => {
  return (
    <footer className="mt-16 bg-green-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3">

        <div>
          <h2 className="text-2xl font-bold">
            🛒 বাজার দর
          </h2>
          <p className="mt-3 text-sm text-green-100">
            নিত্যপ্রয়োজনীয় পণ্যের সর্বশেষ বাজারদর সহজে দেখুন।
          </p>
        </div>

        <div>
          <h3 className="font-semibold">
            দ্রুত লিংক
          </h3>

          <div className="mt-3 space-y-2 text-sm text-green-100">
            <p>হোম</p>
        <p>সব পণ্য</p>
            <p>প্রোফাইল</p>
          </div>
        </div>

        <div>
          <h3 className="font-semibold">
            যোগাযোগ
          </h3>

          <p className="mt-3 text-sm text-green-100">
          Email: support@bazardor.com
          </p>
        </div>

      </div>

      <div className="border-t border-green-800 px-4 py-4 text-center text-sm text-green-200">
        © 2026 বাজার দর — All Rights Reserved
      </div>
    </footer>
  );
};

export default Footer;