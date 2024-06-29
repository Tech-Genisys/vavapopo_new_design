"use client";
import React from "react";
import { Carousel } from "@material-tailwind/react";
const TripSlider = ({ image }) => {
  return (
    <Carousel
      loop
      className="rounded-xl h-[400px] "
      navigation={({ setActiveIndex, activeIndex, length }) => (
        <div className="absolute bottom-4 left-2/4 z-50 flex -translate-x-2/4 gap-2">
          {new Array(length).fill("").map((_, i) => (
            <span
              key={i}
              className={`block h-1 cursor-pointer rounded-2xl transition-all content-[''] ${
                activeIndex === i ? "w-8 bg-white" : "w-4 bg-white/50"
              }`}
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
      )}
    >
      {image ? (
        image.flatMap((element) =>
          element.images.map((e, index) => (
            <img
              key={index}
              src={e.url}
              alt={`image ${index + 1}`}
              className="h-full w-full object-cover"
            />
          ))
        )
      ) : (
        <h1>Loading</h1>
      )}
    </Carousel>
  );
};

export default TripSlider;
