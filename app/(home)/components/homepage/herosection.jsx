"use client";
import { ParallaxLayer } from "@react-spring/parallax";
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
  const backgroundStyle = {};
  return (
    <main
      className="min-h-[600px] md:min-h-screen py-20 flex items-center relative flex-col bg-gradient-to-b from-[#F0FFF0] to-[#CDFECF] -z-10 bg-center bg-cover"
      style={{ backgroundImage: "url('/hero/forest.jpg')" }}
    >
      <Navbar />
      {/* <ParallaxLayer offset={0} speed={-0.4}>
        <Image
          priority
          src="/hero/hill.svg"
          width={1000}
          height={1000}
          className="scale-[200%] w-full lg:scale-100 absolute bottom-5"
        />
      </ParallaxLayer> */}
      <ParallaxLayer offset={0} speed={1.4}>
        <Image
          priority
          src="/hero/kakka.svg"
          width={50}
          height={50}
          className="absolute top-[14%] md:top-[16%] left-[10%]"
        />
      </ParallaxLayer>
      {/* <ParallaxLayer offset={0} speed={-0.5}>
        <Image
          priority
          src="/hero/anna.svg"
          width={287}
          height={187}
          className="absolute bottom-3 md:bottom-10 lg:bottom-16 right-0 w-[187px] h-[87px] sm:w-[250px] sm:h-[150px] lg:w-[287px] lg:h-[187px] xl:w-[320px] xl:h-[220px]"
        />
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={-0.5}>
        <Image
          priority
          src="/hero/anna-small.svg"
          width={120}
          height={120}
          className="absolute bottom-6 sm:bottom-10 md:bottom-12 lg:bottom-14 xl:bottom-16 right-0 w-[50px] h-[40px] sm:w-[85px] sm:h-[75px] md:w-[100px] md:h-[90px] lg:w-[120px] lg:h-[110px] xl:w-[130px] xl:h-[120px]"
        />
      </ParallaxLayer> */}
      <ParallaxLayer offset={0} speed={3}>
        <Image
          priority
          src="/hero/leaf.svg"
          width={1000}
          height={1000}
          className="w-[80%] h-fit absolute top-0 right-0"
        />
      </ParallaxLayer>
      <ParallaxLayer speed={0.2} offset={0}>
        <h2 className="text-3xl w-[70%] sm:text-3xl md:text-4xl lg:text-5xl max-w-xl text-center font-bold text-whi mb-10 absolute top-[15%] md:top-[16%] right-1/2 translate-x-1/2">
          Discover Kerala's <br />
          <p className="text-green-800">
            {text}
            <span>
              <Cursor />
            </span>
          </p>
        </h2>
      </ParallaxLayer>
      <ParallaxLayer offset={0} speed={0.5}>
        <p className="w-[90%] max-w-xl text-xs mt-4 sm:mt-0 md:text-sm text-center font-medium mb-20 absolute top-[28%] md:top-[35%] right-1/2 translate-x-1/2">
          Dive into cultural, and heritage tours. Experience the warmth of local
          hospitality, explore rich traditions.
        </p>
      </ParallaxLayer>
      {/* <ParallaxLayer offset={0} speed={-1.5}> */}
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

        <div className="absolute top-[55%] md:top-[50%] right-1/2 translate-x-1/2 z-10">
          <button className="py-2 px-16 bg-[#248C00] rounded-md text-white font-semibold animate-bounce hover:bg-green-700">
            Explore
          </button>
        </div>

        {/* </ParallaxLayer> */}
        <Image
          priority
          src="/hero/base.png"
          width={1000}
          height={1000}
          className="w-full h-fit absolute bottom-0"
        />
      </div>
      <div className="absolute translate-x-1/2 mr-6 bottom-16 sm:hidden   ">
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
