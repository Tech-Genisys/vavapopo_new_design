"use client";
import Image from "next/image";
import Navbar from "../navbar";
import { useTypewriter, Cursor } from "react-simple-typewriter";
function Herosection() {
  const [text, helper] = useTypewriter({
    words: [
      "tranquil backwaters.",
      "green landscapes.",
      "culture and beauty.",
      "mountains and rivers.",
      "stunning sunsets.",
      "ayurvedic wellness.",
      "wildlife and beaches.",
    ],
    loop: {},
    typeSpeed: 30,
    deleteSpeed: 30,
  });
  return (
    <main
      className="min-h-[600px] md:min-h-screen py-20 flex items-center flex-col bg-gradient-to-b from-[#F0FFF0] to-[#CDFECF] bg-center bg-cover relative overflow-hidden"
      style={{ backgroundImage: "url('/hero/forest.jpg')" }}
    >
      <Navbar />
      <Image
        priority
        src="/hero/kakka.svg"
        width={50}
        height={50}
        className="absolute top-[14%] md:top-[16%] left-[10%]"
      />
      <Image
        priority
        src="/hero/leaf.svg"
        width={1000}
        height={1000}
        className="w-[80%] h-fit absolute top-0 right-0"
        data-aos="fade-down"
      />
      <h2 className="text-3xl w-[70%] sm:text-3xl md:text-4xl lg:text-5xl max-w-xl text-center font-bold text-whi mb-10 mt-10">
        Discover Kerala's <br />
        <p className="text-green-800">
          {text}
          <span>
            <Cursor />
          </span>
        </p>
      </h2>
      <p
        className="w-[90%] max-w-xl text-xs mt-4 sm:mt-0 md:text-sm text-center font-medium mb-20"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        Dive into cultural, and heritage tours. Experience the warmth of local
        hospitality, explore rich traditions.
      </p>
      <div className="w-full">
        {/* <div className="sm:max-w-3xl w-11/12 p-2 rounded-md bg-[#00F00A] bg-opacity-10 absolute top-[40%] md:top-[50%] right-1/2 translate-x-1/2 z-10">
          <div className="py-2 px-4 rounded-md bg-[#4BAE4F] bg-opacity-70 text-white flex flex-wrap  justify-between items-center w-full max-w-3xl">
            <div className=" md:w-fit w-1/2">
              <p className="text-xs md:text-sm font-medium">Destination</p>
              <select className="text-[10px] md:text-xs bg-transparent  rounded ">
                <option value="" className="bg-white text-sm text-gray-700 ">
                  Where are you going?
                </option>
                <option value="" className="bg-white text-sm text-gray-700">
                  Kerala
                </option>
              </select>
            </div>
            <div className=" md:w-fit w-1/2">
              <p className="text-xs md:text-sm font-medium">Days</p>
              <select className="text-[10px] md:text-xs bg-transparent  rounded ">
                <option value="" className="bg-white text-sm text-gray-700 ">
                  How many days?
                </option>
                <option value="" className="bg-white text-sm text-gray-700">
                  1
                </option>
              </select>
            </div>
            <button className="text-sm md:text-[16px] w-full md:w-fit py-1 px-4 rounded-md bg-[#489D2A] font-semibold z-40 hover:scale-105 mt-4 md:mt-0">
              Search
            </button>
          </div>
        </div> */}

        <div
          className="flex justify-center z-10"
          data-aos="zoom-in"
          data-aos-durtaion="1000"
        >
          <button className="py-2 px-16 bg-foreground rounded-md text-white font-semibold animate-bounce hover:bg-green-700 border border-black border-opacity-10">
            Explore
          </button>
        </div>
        <Image
          priority
          src="/hero/base.png"
          width={1000}
          height={1000}
          className="w-full h-fit absolute bottom-0"
        />
      </div>
      <div className="absolute translate-x-1/2 mr-6 bottom-16 sm:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6 animate-bounce"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 5.25 7.5 7.5 7.5-7.5m-15 6 7.5 7.5 7.5-7.5"
          />
        </svg>
      </div>
    </main>
  );
}

export default Herosection;
