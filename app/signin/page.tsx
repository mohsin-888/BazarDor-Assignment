"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "../../lib/auth-client";

const SignInPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [redirectPath, setRedirectPath] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    const protectedRoute = params.get("protected");
    const redirect = params.get("redirect");

    if (redirect) {
      setRedirectPath(redirect);
    }

    if (protectedRoute === "true") {
      toast.error("পণ্যের বিস্তারিত দেখতে আগে সাইন ইন করুন");
    }
  }, []);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("ইমেইল ও পাসওয়ার্ড দিন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (error) {
        toast.error(
          error.message || "ইমেইল অথবা পাসওয়ার্ড সঠিক নয়"
        );

        setLoading(false);
        return;
      }

      toast.success("সাইন ইন সফল হয়েছে");

      setTimeout(() => {
        router.push(redirectPath);
        router.refresh();
      }, 800);

    } catch (error) {
      console.log(error);
      toast.error("সাইন ইন করতে সমস্যা হয়েছে");
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
            সাইন ইন করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার বাজার দর অ্যাকাউন্টে প্রবেশ করুন
          </p>
        </div>

        <form
          onSubmit={handleSignIn}
          className="mt-8 space-y-5"
        >

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
              placeholder="আপনার পাসওয়ার্ড"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
    
    
            className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading ? "সাইন ইন হচ্ছে..." : "সাইন ইন"}
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
      callbackURL: redirectPath,
  });
  }}
  className="w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
>
  GitHub দিয়ে সাইন ইন করুন
</button>
<button
  type="button"
  onClick={async () => {
    await authClient.signIn.social({
      provider: "google",
   callbackURL: redirectPath,
    });
  }}
  className="mt-3 w-full rounded-lg border border-gray-300 bg-white px-5 py-3 font-semibold text-gray-800 hover:bg-gray-50"
>
  Google দিয়ে সাইন ইন করুন
</button>
        <p className="mt-6 text-center text-sm text-gray-600">
          অ্যাকাউন্ট নেই?{" "}
      <Link
            href="/signup"
        className="font-semibold text-green-700"
          >
         রেজিস্টার করুন
          </Link>
      </p>

      </div>
    </main>
  );
};

export default SignInPage;