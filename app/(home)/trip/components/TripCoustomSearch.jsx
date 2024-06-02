"use client";
import React, { useState } from "react";
import Bookingform from "./bookingform";
import Link from "next/link";

const TripCoustomSearch = ({ id }) => {
  const [open, setopen] = useState(false);
  return (
    <div className="w-full ">
      {/* <Bookingform /> */}
      <div className="px-8 pb-24">
        <h1 className="text-2xl font-bold mb-9">Get your quote! </h1>
        <div className="w-full  h-[300px] rounded-2xl border relative bg-[#F0FFF1]">
          <img
            src="https://img.freepik.com/free-vector/wave-textures-white-background-vector_53876-60286.jpg"
            alt=""
            className="h-full w-full bg-cover shadow-xl rounded-2xl absolute left-0 z-10 bg-blend-screen
            "
          />
          <div className="z-20 absolute w-full grid lg:grid-cols-2 items-center h-full px-8">
            <div className=" flex flex-col justify-between">
              <h1 className=" text-xl sm:text-2xl font-bold mb-9 ">
                Get a call from us and get personalised itinerary just for you,
                guided by traveller tips and reviews.
              </h1>
              <Link
                href={`/booking/${id}`}
                className=" flex bg-white rounded-full px-3 py-2  h-[60px] items-center  shadow  cursor-pointer  hover:bg-gray-50 "
              >
                <div className=" w-full px-5">
                  <h1 className="font-bold">GET NOW</h1>
                </div>
                <button className="bg-[#F0FFF1] px-3 rounded-full py-2   ">
                  <img src="/trip/arrow.svg" alt="" className="w-7 h-7" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripCoustomSearch;
