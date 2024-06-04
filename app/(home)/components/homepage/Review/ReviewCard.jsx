"use client";
import { Rating } from "@material-tailwind/react";
import React from "react";

const ReviewCard = ({ name, country, rating, description }) => {
  return (
    <div className="bg-white rounded-xl">
      <div className="w-[300px] sm:w-[400px] border flex flex-col px-7 py-7 rounded-xl shadow-xl h-full">
        <h1 className="font-bold text-xl">{name}</h1>
        <h1 className="font-bold text-gray-500">{country}</h1>

        <Rating value={rating} readonly className="mt-4" />
        <p className="mt-6">{description}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
