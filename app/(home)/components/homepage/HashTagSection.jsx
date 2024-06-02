"use client";
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import HashTagCard from "./HashTag/HashTagCard";

const HashTagSection = () => {
  return (
    // <div className="flex justify-center min-h-screen bg-[#F0FFF1]">
    //   <div className="w-full  py-8 relative flex flex-col items-center ">
    //     <div className="w-full  bg-[#F0FFF1] absolute top-8 bottom-60 rounded-3xl"></div>
    //     <div className="z-10 w-full  py-5">
    //       <div className="bg-green-700 py-5 text-white">
    //         <h1 className="font-bold text-2xl sm:text-3xl text-center">
    //           {`Through Our Visitors' Eyes`}
    //         </h1>
    //         <p className="text-center font-semibold text-xl mt-2">#VAVAPOPO</p>
    //       </div>
    //       <div className="px-10 flex justify-center">
    //         <ResponsiveMasonry
    //           columnsCountBreakPoints={{ 350: 1, 430: 2, 750: 3, 900: 4 }}
    //           className="w-full z-20 mt-14 max-w-5xl"
    //         >
    //           <Masonry gutter="20px">
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/3183187/pexels-photo-3183187.jpeg?auto=compress&cs=tinysrgb&w=600"
    //               }
    //             />
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/8088444/pexels-photo-8088444.jpeg?auto=compress&cs=tinysrgb&w=600"
    //               }
    //             />
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/8088689/pexels-photo-8088689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //               }
    //             />
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/23285770/pexels-photo-23285770/free-photo-of-man-picking-up-a-woman-while-standing-ankles-deep-in-the-sea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //               }
    //             />
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/8088452/pexels-photo-8088452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //               }
    //             />
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/20836361/pexels-photo-20836361/free-photo-of-a-person-holding-a-cup-of-coffee-in-bed.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //               }
    //             />
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/24375091/pexels-photo-24375091/free-photo-of-a-dog-standing-in-a-field-of-dandelions.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
    //               }
    //             />
    //             <HashTagCard
    //               image={
    //                 "https://images.pexels.com/photos/24032619/pexels-photo-24032619/free-photo-of-a-scenic-mountain-road-in-nepal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    //               }
    //             />
    //           </Masonry>
    //         </ResponsiveMasonry>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <>
      <Test />
    </>
  );
};

export default HashTagSection;

const Test = () => {
  const element = [];
  for (let index = 0; index < 6; index++) {
    element.push(
      <div className="w-full aspect-[3/4] relative">
        <img
          src="https://images.pexels.com/photos/24032619/pexels-photo-24032619/free-photo-of-a-scenic-mountain-road-in-nepal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="h-full object-cover"
        />{" "}
        <div className="absolute bg-gradient-to-b from-transparent to-black opacity-70 hover:opacity-5 w-full  h-full top-0"></div>
        <a
          href=""
          className="absolute bottom-0 p-3 font-semibold tracking-wide text-white break-all whitespace-normal text-[8px] sm:text-xs md:text-sm"
        >
          @Abhinav_shyju
        </a>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col py-24 bg-[#F0FFF1]">
      <div className="bg-green-700 py-5 text-white">
        <h1 className="font-bold text-2xl sm:text-3xl text-center">
          {`Through Our Visitors' Eyes`}
        </h1>
        <p className="text-center font-semibold text-xl mt-2">#VAVAPOPO</p>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6">{element}</div>
      <div className="bg-green-700 py-8 flex justify-center text-white">
        <div className="flex gap-3">
          <h1 className="font-semibold text-base sm:text-2xl ">
            FOLLOW VAVAPOPP :
          </h1>
          <img src="/footer/facebookIcon.svg" alt="" />
          <img src="/footer/instaIcon.svg" alt="" />
          <img src="/footer/linkedInIcon.svg" alt="" />
        </div>
      </div>
    </div>
  );
};
