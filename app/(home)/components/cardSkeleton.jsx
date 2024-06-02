import React from "react";

export function PackageCardSkeleton() {
  return (
    <div className="flex border animate-pulse p-5">
      <div className="flex justify-center items-center min-h-[250px] bg-gray-300 w-1/2 rounded-md">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
          />
        </svg>
      </div>
      <div className="flex flex-col gap-3 w-1/2 pl-4">
        <div className="h-16 bg-gray-300 rounded-md"></div>
        <div className="h-10 w-36 bg-gray-300 rounded-md"></div>
        <div className="h-full bg-gray-300 rounded-md"></div>
      </div>
    </div>
  );
}

export const CountSkeleton = () => {
  return (
    <div className="max-w-[300px] w-full rounded-md bg-white h-[90px] animate-pulse grid grid-cols-2 p-3">
      <div className="h-8 w-8 bg-gray-200 rounded-md"></div>
      <div className="text-end h-full flex flex-col justify-between gap-4">
        <div className="flex justify-end">
          <p className="text-sm text-gray-800 bg-gray-200 w-16 h-5 rounded-md"></p>
        </div>
        <div className="flex justify-end">
          <p className="font-medium text-lg text-gray-800 bg-gray-200 w-20 h-7 rounded-md"></p>
        </div>
      </div>
    </div>
  );
};

export const BookingReqSkeleton = () => {
  return (
    <div className="p-3 bg-white animate-pulse border-b border-gray-300">
      <div className="h-5 w-48 bg-gray-300 rounded-md mb-2"></div>
      <div className="h-5 w-40 bg-gray-300 rounded-md mb-2"></div>
      <div className="flex gap-5">
        <div className="h-6 w-32 bg-gray-300 rounded-full"></div>
        <div className="h-6 w-32 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
};
