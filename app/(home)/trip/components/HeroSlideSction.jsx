import React from "react";
import TripSlider from "./TripSlider";
const HeroSlideSction = ({ data }) => {
  return (
    <div className="max-w-7xl px-8 py-20 w-full ">
      {/* Slider */}
      <TripSlider image={data.days} />
      <div className="md:px-16 py-10">
        <h1 className="text-3xl font-semibold mb-2">{data.packageTitle}</h1>
        <p className="flex gap-1 underline items-center">
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          {data.state}
        </p>
        <p className=" text-sm sm:text-base font-normal text-black border-b-0 mt-4">
          {data.description}
        </p>
      </div>
    </div>
  );
};

export default HeroSlideSction;
