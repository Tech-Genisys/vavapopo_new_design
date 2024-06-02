"use client";

import { useEffect, useState } from "react";
import { Carousel, Typography, Button } from "@material-tailwind/react";
import Image from "next/image";

const bgImageData = [
  {
    image: "/fullpage/kalari.jpg",
    title: "Kalaripayattu - the martial artsform",
    description: `Considered among the oldest and most scientific martial arts in the
    world, Kalaripayattu was developed in Kerala. Lauded as the pride of
    Kerala, it is acknowledged and respected across the world. The
    training begins with an oil massage of the entire body until it is
    agile and supple.`,
  },
  {
    image: "/fullpage/theyyam.jpg",
    title: "Theyyam - The enigmatic tradition of Kerala",
    description:
      "Theyyam, an ancient ritualistic dance form indigenous to Kerala, captivates spectators with its vibrant costumes, intricate makeup, and soul-stirring performances, showcasing the state's rich cultural tapestry and spiritual essence in a mesmerizing display of artistry and devotion.",
  },
  {
    image: "/fullpage/boat.jpg",
    title: "House boat - Alappuzha house boat",
    description: `Glide through the tranquil backwaters of Alappuzha aboard a traditional houseboat, immersing yourself in the serene beauty of Kerala's waterways while indulging in luxurious comfort and savoring delicious local cuisine amidst breathtaking natural vistas.`,
  },
];

function Fullpageimagesection() {
  return (
    <main className="">
      <Carousel className="max-h-screen" autoplay autoplayDelay={10000} loop>
        {bgImageData.map((e) => (
          <>
            <div className="relative w-full max-h-screen">
              <Image
                height={1500}
                width={1500}
                priority
                src={e.image}
                alt="image 3"
                className=" w-full object-cover max-h-screen min-h-[500px]"
              />
              <div className="max-w-5xl mx-auto w-full flex justify-center md:justify-start absolute bottom-8   md:bottom-24 md:left-28 ">
                <div className="p-4 rounded-md bg-[#003329] bg-opacity-65 text-white w-[300px] md:w-full max-w-[400px]">
                  <h3 className=" sm:text-xl font-semibold mb-1 sm:mb-5">
                    {e.title}
                  </h3>
                  <p className="text-xs sm:text-sm ">{e.description}</p>
                </div>
              </div>
            </div>
          </>
        ))}
      </Carousel>
    </main>
  );
}

export default Fullpageimagesection;
