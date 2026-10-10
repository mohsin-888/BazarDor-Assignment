"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { authClient } from "../../../lib/auth-client";

const UpdateProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Login না থাকলে Sign In page-এ পাঠাবে
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  // Current name input-এর ভিতরে দেখাবে
  useEffect(() => {
    if (session?.user?.name) {
      setName(session.user.name);
    }
  }, [session]);

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(
          error.message || "তথ্য আপডেট করা যায়নি"
        );

        setLoading(false);
        return;
      }

      toast.success("তথ্য সফলভাবে আপডেট হয়েছে");

      setTimeout(() => {
        router.push("/profile");
        router.refresh();
      }, 800);

    } catch (error) {
      console.log(error);

      toast.error("তথ্য আপডেট করতে সমস্যা হয়েছে");
      setLoading(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="h-60 w-full max-w-md animate-pulse rounded-2xl bg-gray-200"></div>
      </main>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <main className="flex min-h-[75vh] items-center justify-center bg-gray-50 px-4 py-12">

      <Toaster position="top-right" />

      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <div className="text-center">

          <div className="text-4xl">
            👤
          </div>

          <h1 className="mt-3 text-3xl font-bold text-gray-900">
            তথ্য আপডেট করুন
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            আপনার নাম পরিবর্তন করুন
          </p>

        </div>

        <form
          onSubmit={handleUpdate}
          className="mt-8"
        >

          <label className="mb-2 block text-sm font-medium text-gray-700">
            নাম
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 outline-none focus:border-green-600"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-5 w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white hover:bg-green-800 disabled:opacity-60"
          >
            {loading
              ? "আপডেট হচ্ছে..."
              : "Update Information"}
          </button>

        </form>

      </div>
    </main>
  );
};

export default UpdateProfilePage;