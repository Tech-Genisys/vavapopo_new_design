"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Carousel,
} from "@material-tailwind/react";
import Link from "next/link";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import { db } from "@/app/firebase/firebaseinit";
import { async } from "@firebase/util";
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
  update = null,
  id = null,
  trigger = null,
  exclusive = null,
}) => {
  const [open, setOpen] = React.useState(0);
  const [deletePack, setDeltePack] = useState(false);

  const deletePackFunc = async () => {
    try {
      console.log(id);
      const docRef = doc(db, "packages", id);
      await deleteDoc(docRef);
      trigger("success");
    } catch (error) {
      console.log(error);
      trigger("error");
    }
  };

  const changeExclusiveStatus = async (bool) => {
    try {
      const docRef = doc(db, "packages", id);
      await updateDoc(docRef, { exclusive: bool });
      trigger("success");
    } catch (error) {
      console.log(error);
    }
  };

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
        {images
          ? images.map((e) => {
              return (
                <>
                  <Image
                    src={e}
                    width={500}
                    height={500}
                    priority
                    alt="image 1"
                    className="h-full w-full object-cover"
                  />
                </>
              );
            })
          : "loading"}
      </Carousel>
      <div className=" flex flex-col py-5 px-6 justify-between w-full">
        <div className="">
          <h1 className="font-semibold  text-xl sm:text-2xl">
            {title ? title : "Title"}
          </h1>
          <p className="text-sm sm:text-base underline mt-2 flex items-center gap-1">
            {" "}
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
          <div className=" flex  ">
            {/* <p className="font-semibold text-xl bg-[#56BD80] px-5 py-1 rounded-2xl text-white mt-5">
              Show Details
            </p> */}
          </div>
          <div className=" flex gap-3 mt-3 flex-wrap">
            <p className="bg-purple-50 px-4 py-1 rounded-full font-bold text-sm">
              Defualt Days : {days ? days : "0 Days"}
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
        <div className=" mt-3 flex justify-between items-end">
          <div className="flex gap-1 items-end">
            {" "}
            <h1 className=" text-xs sm:text-sm md:text-base font-semibold ">
              Starting @{" "}
            </h1>
            <h1 className="font-bold text-sm sm:text-base md:text-lg ">
              {" "}
              ₹{price ? price : "Loading"}
            </h1>
          </div>
        </div>
        {update ? (
          <div className="gap-5 grid grid-cols-2">
            <Link href={`/admin/edit-package/${id}`} className="w-full">
              <button className="px-4 py-1 rounded-md bg-orange-300 font-medium hover:scale-105 hover:shadow-lg w-full">
                Edit
              </button>
            </Link>
            {deletePack ? (
              <div className="flex gap-3 w-full">
                <button
                  className="px-4 py-1 rounded-md bg-red-500 font-medium hover:scale-105 hover:shadow-lg w-full"
                  onClick={deletePackFunc}
                >
                  Confirm
                </button>

                <button
                  className="px-2 py-1 rounded-md bg-orange-300 font-medium hover:scale-105 hover:shadow-lg w-full"
                  onClick={() => setDeltePack(false)}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                className="px-4 py-1 rounded-md bg-red-400 font-medium hover:scale-105 hover:shadow-lg w-full"
                onClick={() => setDeltePack(true)}
              >
                Delete
              </button>
            )}
            <button
              className={`px-4 py-1 rounded-md ${
                exclusive ? "bg-red-400" : "bg-green-400"
              } font-medium hover:scale-105 hover:shadow-lg`}
              onClick={() => {
                if (exclusive) changeExclusiveStatus(false);
                else changeExclusiveStatus(true);
              }}
            >
              {exclusive ? "Remove from exclusive" : "Add to exclusive"}
            </button>
          </div>
        ) : (
          <Link href={`/trip/${id}`}>
            <button className="px-4 py-1 rounded-md bg-orange-300 shadow font-bold   hover:scale-100 hover:shadow-lg w-full md:max-w-[200px] mt-3 md:mt-0">
              Show
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default PackCard;
