"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import PriceTicker from "./PriceTicker";
import { authClient } from "../lib/auth-client";

const categories = [
  { name: "সব", slug: "" },
  { name: "চাল", slug: "chal" },
  { name: "ডাল", slug: "dal" },
  { name: "তেল", slug: "tel" },
  { name: "সবজি", slug: "sobji" },
  { name: "মাছ", slug: "mach" },
  { name: "মাংস", slug: "mangsho" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } =
    authClient.useSession();

  const [banglaDate, setBanglaDate] =
    useState("");

  useEffect(() => {
    const date = new Intl.DateTimeFormat(
      "bn-BD",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    ).format(new Date());

    setBanglaDate(date);
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();

    toast.success("সাইন আউট সফল হয়েছে");

    router.push("/");
    router.refresh();
  };

  return (
    <header className="border-b border-gray-200 bg-white">

      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">

        <Link href="/">
          <h1 className="text-2xl font-bold text-green-700">
            🛒 বাজার দর
          </h1>

          <p className="mt-1 text-xs text-gray-500">
            {banglaDate}
          </p>
        </Link>

        <div className="flex items-center gap-3">

          {isPending ? (

            <div className="h-10 w-28 animate-pulse rounded-lg bg-gray-200"></div>

          ) : session?.user ? (

            <>
    {/* Profile */}
              <Link
                href="/profile"
                className="hidden text-sm font-semibold text-gray-700 sm:block"
              >
                👤 {session.user.name}
              </Link>

             <Link
                href="/profile"
                className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-700"
              >
                প্রোফাইল
              </Link>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
              >
                সাইন আউট
              </button>
            </>

          ) : (

            <>
              <Link
                href="/signin"
                className="rounded-lg border border-green-700 px-4 py-2 text-sm font-medium text-green-700"
              >
                সাইন ইন
              </Link>

              <Link
                href="/signup"
                className="rounded-lg bg-green-700 px-4 py-2 text-sm font-medium text-white"
              >
                সাইন আপ
              </Link>
            </>

          )}

        </div>
      </div>
      <nav className="border-t border-gray-100">
        <div className="mx-auto flex max-w-6xl gap-6 overflow-x-auto px-4 py-3">

         {categories.map((category) => {
            const href = category.slug
              ? `/category/${category.slug}`
              : "/";

            const active =
       pathname === href;

            return (
              <Link
                key={category.name}
             href={href}
                className={
                  active
                    ? "whitespace-nowrap font-semibold text-green-700"
                    : "whitespace-nowrap text-gray-600 hover:text-green-700"
                }
              >
                {category.name}
              </Link>
            );
          })}

        </div>
      </nav>

      <PriceTicker />

    </header>
  );
};

export default Navbar;