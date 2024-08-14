"use client";

import React, { useState } from "react";

const SearchSection = ({
  filter,
  destination,
  setDestination,
  days,
  setDays,
}) => {
  const handleFilter = async (e) => {
    e.preventDefault();
    filter();
  };
  return (
    <div className="py-32">
      <div className="w-full flex justify-center mt-9  py-14 bg-[#F0FFF1]">
        <div className="max-w-5xl flex flex-col items-center w-full">
          <h1 className="font-bold text-4xl max-w-md text-center">
            Explore Amazing Holiday Packages
          </h1>
          <form
            className="grid  grid-cols-6 md:grid-cols-8  mt-4 px-8 w-full max-w-2xl gap-2"
            onSubmit={handleFilter}
          >
            <div className="relative h-10 w-full col-span-3 md:col-span-3 gap-3 mt-2">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-center"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
              >
                <option value="none">All</option>
                <option value="Kerala">Kerala</option>
                <option value="Goa">Goa</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Karnataka">Karnataka</option>
                <option value="West Bengal">West Bengal</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Destination
              </label>
            </div>
            <div className="relative h-10 w-full col-span-3 md:col-span-3 mt-2 ">
              <select
                className="peer h-full w-full rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 empty:!bg-gray-900 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-center"
                value={days}
                onChange={(e) => setDays(e.target.value)}
              >
                <option value="0">All</option>
                <option value="5">5 days</option>
                <option value="7">7 days</option>
                <option value="10">10 days</option>
                <option value="15">15 days</option>
              </select>
              <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                Duration
              </label>
            </div>

            <button
              className="bg-[#248C00] px-5 py-1 text-lg font-bold text-white rounded-md border col-span-6 md:col-span-2 mt-2 hover:scale-105 hover:shadow-xl"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SearchSection;
