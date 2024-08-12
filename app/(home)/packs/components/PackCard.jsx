"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Carousel,
  Button,
} from "@material-tailwind/react";
import Link from "next/link";
import Image from "next/image";

function Icon({ id, open }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={` sm:block hidden ${
        id === open ? "rotate-180" : ""
      } h-5 w-5 transition-transform`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
}
const PackCard = ({
  images,
  title,
  price,
  description,
  days,
  state,
  id = null,
}) => {
  const [open, setOpen] = React.useState(0);

  const handleOpen = (value) => setOpen(open === value ? 0 : value);
  const splitDescription = (desc, wordLimit) => {
    const words = desc.split(" ");
    if (words.length <= wordLimit) {
      return { firstPart: desc, secondPart: "" };
    }

    const firstPartWords = words.slice(0, wordLimit);
    const restWords = words.slice(wordLimit);
    const restText = restWords.join(" ");
    const fullStopIndex = restText.indexOf(".");

    const firstPart =
      firstPartWords.join(" ") +
      (fullStopIndex !== -1 ? restText.slice(0, fullStopIndex + 1) : "");
    const secondPart =
      fullStopIndex !== -1 ? restText.slice(fullStopIndex + 1).trim() : "";

    return { firstPart, secondPart };
  };

  const { firstPart, secondPart } = description
    ? splitDescription(description, 25)
    : { firstPart: "Loading", secondPart: "Loading" };

  return (
    <div className=" flex w-full max-w-5xl gap-4 flex-col lg:flex-row  border px-2 py-2 rounded-xl shadow ">
      <Carousel
        className=" lg:max-w-[500px] h-[200px] sm:h-[270px]  object-cover rounded-xl w-full min-w-[200px]"
        loop
      >
        {images.map((e) => {
          return (
            <>
              <Image
                src={e.url}
                width={500}
                height={500}
                priority
                alt="image 1"
                className="h-full w-full object-cover"
              />
            </>
          );
        })}
      </Carousel>
      <div className=" flex flex-col py-5 px-6 justify-between w-full">
        <div className="">
          <h1 className="font-semibold  text-xl sm:text-2xl">{title}</h1>
          <p className="text-sm sm:text-base underline mt-2 flex items-center gap-1">
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
            {state}
          </p>
          <div className=" flex gap-3 mt-3 flex-wrap">
            <p className="bg-purple-50 px-4 py-1 rounded-full font-bold text-sm">
              Defualt Days : {days}
            </p>
            <p className="bg-green-50 px-4 py-1 rounded-full font-bold text-sm">
              Custom plan
            </p>
          </div>
          <Accordion open={open === 1} icon={<Icon id={1} open={open} />}>
            <AccordionHeader
              onClick={() => handleOpen(1)}
              className="text-sm sm:text-base font-normal text-black border-b-0 pb-0"
            >
              {firstPart}
            </AccordionHeader>
            <AccordionBody className="text-base font-normal text-black sm:block hidden p-0 mt-0">
              {secondPart}
            </AccordionBody>
          </Accordion>
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:items-end md:justify-between mt-3">
          <div className=" mt-3 flex justify-between items-end">
            <div className="flex gap-1 items-center">
              <h1 className=" text-xs sm:text-sm md:text-base font-semibold ">
                Starting @
              </h1>
              <h1 className="font-bold text-sm sm:text-base md:text-lg ">
                ₹{price}
              </h1>
            </div>
          </div>
          <Link href={`/trip/${id}`} className="w-full md:w-fit">
            <Button
              color="amber"
              variant="gradient"
              className="text-white font-bold w-full"
            >
              Show More
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackCard;
