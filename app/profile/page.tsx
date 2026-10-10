"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "../../lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  useEffect(() => {
    if (!isPending && !session?.user) {
      router.replace("/signin");
    }
  }, [isPending, session, router]);

  if (isPending) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="h-40 w-full max-w-md animate-pulse rounded-2xl bg-gray-200"></div>
      </main>
    );
  }
  if (!session?.user) {
    return null;
  }

  return (
    <main className="min-h-[75vh] bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-md rounded-2xl bg-white p-8 shadow-sm">

        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
         👤
          </div>

          <h1 className="mt-4 text-3xl font-bold text-gray-900">
            আমার প্রোফাইল
          </h1>

          <p className="mt-2 text-gray-500">
            আপনার অ্যাকাউন্টের তথ্য
          </p>

        </div>

        <div className="mt-8 space-y-4">

          <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              নাম
            </p>

            <p className="mt-1 font-semibold text-gray-900">
           {session.user.name}
            </p>
          </div>

        <div className="rounded-xl bg-gray-50 p-4">
            <p className="text-sm text-gray-500">
              ইমেইল
          </p>

            <p className="mt-1 font-semibold text-gray-900">
              {session.user.email}        </p>
          </div>

        </div>
        <Link
          href="/profile/update"
          className="mt-7 block w-full rounded-lg bg-green-700 px-5 py-3 text-center font-semibold text-white hover:bg-green-800"
        >
          তথ্য আপডেট করুন
        </Link>

      </div>
    </main>
  );
};

export default ProfilePage;