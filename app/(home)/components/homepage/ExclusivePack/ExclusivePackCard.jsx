import Link from "next/link";
import React from "react";

const ExclusivePackCard = ({ id, image, name, state, price, size }) => {
  const imageUrl = image.url;
  const styling = { backgroundImage: `url(${imageUrl})` };
  return (
    <div className="w-[600px] flex justify-center -ml-2">
      <div
        className={`w-[60%] sm:w-[400px] md:w-[600px] h-[400px] bg-red-300 rounded-3xl shadow-md flex justify-center items-end bg-cover ${size}`}
        style={styling}
      >
        <div className="bg-white bg-opacity-45 glass flex flex-col items-center justify-center gap-1 mb-6 px-6 py-4 sm:px-12 sm:py-7 rounded-3xl shadow min-w-[240px] sm:w-[300px] md:w-[400px] w-[200px]">
          <h1 className="font-bold sm:text-lg  text-center mb-5">
            {name}, {state}
          </h1>
          {/* <h1 className="font-bold  text-sm sm:text-base text-gray-500 text-center">
            20 + top hotel
          </h1> */}
          <div className="flex gap-1 items-baseline">
            <h1 className="font-bold text-[#2A9134] text-lg text-center ">
              Starting ₹{price}
            </h1>
            {/* <h1 className="font-black text-gray-500  ">Per Night </h1> */}
          </div>
          <Link href={`/trip/${id}`}>
            <button className="bg-[#2A9134] rounded-full px-8 py-1 text-white font-bold mt-3 hover:scale-105 hover:shadow-xl">
              View Pack
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExclusivePackCard;
