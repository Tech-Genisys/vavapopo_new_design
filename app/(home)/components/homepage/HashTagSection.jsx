"use client";
import React, { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import HashTagCard from "./HashTag/HashTagCard";

const HashTagSection = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      console.log("Screen width:", window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className="flex justify-center min-h-screen bg-[#F0FFF1]">
      <div className="w-full  py-8 relative flex flex-col items-center ">
        <div className="w-full max-w-5xl bg-[#F0FFF1] absolute top-8 bottom-60 rounded-3xl"></div>
        <div className="z-10 w-full max-w-6xl py-5">
          <div className="bg-green-700 py-5 text-white">
            <h1 className="font-bold text-2xl sm:text-3xl text-center">
              Through Our Visitors' Eyes
            </h1>
            <p className="text-center font-semibold text-xl mt-2">#VAVAPOPO</p>
          </div>
          <div className="px-10">
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 430: 2, 750: 3, 900: 4 }}
              className="w-full z-20 mt-14"
            >
              <Masonry gutter="20px">
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/3183187/pexels-photo-3183187.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                />
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/8088444/pexels-photo-8088444.jpeg?auto=compress&cs=tinysrgb&w=600"
                  }
                />
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/8088689/pexels-photo-8088689.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                />
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/23285770/pexels-photo-23285770/free-photo-of-man-picking-up-a-woman-while-standing-ankles-deep-in-the-sea.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  }
                />
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/8088452/pexels-photo-8088452.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                />
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/20836361/pexels-photo-20836361/free-photo-of-a-person-holding-a-cup-of-coffee-in-bed.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  }
                />
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/24375091/pexels-photo-24375091/free-photo-of-a-dog-standing-in-a-field-of-dandelions.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load"
                  }
                />
                <HashTagCard
                  image={
                    "https://images.pexels.com/photos/24032619/pexels-photo-24032619/free-photo-of-a-scenic-mountain-road-in-nepal.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  }
                />
              </Masonry>
            </ResponsiveMasonry>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashTagSection;
