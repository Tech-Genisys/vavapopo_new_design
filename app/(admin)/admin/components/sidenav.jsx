"use client";

import { auth } from "@/app/firebase/firebaseinit";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

function Sidenav() {
  const pathName = usePathname();
  const [toggleNav, setToggleNav] = useState(false);

  return (
    <>
      <div
        className={`right-5 top-5 absolute ${toggleNav && "hidden"} xl:hidden`}
        onClick={() => setToggleNav(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <div
        className={`p-4 ${
          toggleNav ? "block" : "hidden"
        }  h-full xl:block z-20`}
      >
        <nav className="h-full p-4 fixed rounded-md border border-gray-300 bg-white w-[288px]">
          <div className="xl:hidden" onClick={() => setToggleNav(false)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h3 className="text-center font-medium mt-2 text-xl mb-4">VAVAPOP</h3>
          <hr className="mb-10" />
          <ul className="grid grid-cols-1 gap-1 font-medium">
            <Link href="/admin" onClick={() => setToggleNav(false)}>
              <li
                className={`py-3 px-4 rounded-md hover:bg-gray-100 ${
                  pathName == "/admin" &&
                  "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
                }`}
              >
                Dashboard
              </li>
            </Link>
            <Link
              href="/admin/booking-history"
              onClick={() => setToggleNav(false)}
            >
              <li
                className={`py-3 px-4 rounded-md hover:bg-gray-100 ${
                  pathName == "/admin/booking-history" &&
                  "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
                }`}
              >
                Booking history
              </li>
            </Link>
            <Link
              href="/admin/add-packages"
              onClick={() => setToggleNav(false)}
            >
              <li
                className={`py-3 px-4 rounded-md hover:bg-gray-100 ${
                  pathName == "/admin/add-packages" &&
                  "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
                }`}
              >
                Add Packages
              </li>
            </Link>
            <Link href="/admin/packages" onClick={() => setToggleNav(false)}>
              <li
                className={`py-3 px-4 rounded-md hover:bg-gray-100 ${
                  pathName == "/admin/packages" &&
                  "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
                }`}
              >
                Edit Packages
              </li>
            </Link>
            <Link href="/admin/add-blog" onClick={() => setToggleNav(false)}>
              <li
                className={`py-3 px-4 rounded-md hover:bg-gray-100 ${
                  pathName == "/admin/add-blog" &&
                  "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
                }`}
              >
                Add Blog
              </li>
            </Link>
            <Link href="/admin/blogs" onClick={() => setToggleNav(false)}>
              <li
                className={`py-3 px-4 rounded-md hover:bg-gray-100 ${
                  pathName == "/admin/blogs" &&
                  "bg-gradient-to-b from-gray-800 to-gray-900 text-white"
                }`}
              >
                Edit Blog
              </li>
            </Link>
          </ul>
          <div className="mt-20 flex justify-center">
            <button
              className="font-medium py-1 px-4 rounded-md bg-gradient-to-b from-gray-800 to-gray-900 text-white xl:hidden"
              onClick={() => signOut(auth)}
            >
              Logout
            </button>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Sidenav;
