"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

const SignUpPage = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password) {
      toast.error("সবগুলো তথ্য পূরণ করুন");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
      });

      console.log("SIGNUP DATA:", data);
      console.log("SIGNUP ERROR:", error);

      if (error) {
        toast.error(
          `${error.code || "ERROR"}: ${
            error.message || "Unknown error"
          }`
        );

        setLoading(false);
        return;
      }

      toast.success("রেজিস্ট্রেশন সফল হয়েছে");

      setTimeout(() => {
        router.push("/signin");
      }, 1000);
    } catch (err) {
      console.error("SIGNUP CATCH ERROR:", err);

      toast.error("Unexpected signup error");
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-12">

      <Toaster position="top-right" />

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <div className="text-center">
          <div className="text-4xl">
            🛒
          </div>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            অ্যাকাউন্ট তৈরি করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            বাজার দর ব্যবহার করতে রেজিস্ট্রেশন করুন
          </p>
        </div>

        <form
          onSubmit={handleSignUp}
          className="mt-8 space-y-5"
        >

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              নাম
            </label>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="আপনার নাম"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              ইমেইল
            </label>

            <input
       type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600"
            />
          </div>

    <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              পাসওয়ার্ড
            </label>

            <input
              type="password"
              value={password}
            onChange={(e) => setPassword(e.target.value)}
              placeholder="কমপক্ষে ৮ অক্ষর"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600"
            />
          </div>

        <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading
              ? "রেজিস্ট্রেশন হচ্ছে..."
              : "রেজিস্টার করুন"}
          </button>
        </form>
        <div className="my-6 flex items-center gap-3">
  <div className="h-px flex-1 bg-gray-200"></div>

  <span className="text-sm text-gray-400">
    অথবা
  </span>

  <div className="h-px flex-1 bg-gray-200"></div>
</div>

<button
  type="button"
  onClick={async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
  });
  }}
  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
>
  GitHub দিয়ে চালিয়ে যান
</button>

<button
  type="button"
  onClick={async () => {
    await authClient.signIn.social({
      provider: "google",
   callbackURL: "/",
    });
  }}
  className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
>
  Google দিয়ে চালিয়ে যান
</button>

       <p className="mt-6 text-center text-sm text-gray-600">
          আগে থেকেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700"
        >
            সাইন ইন করুন
          </Link>
        </p>

      </div>
    </main>
  );
};

export default SignUpPage;