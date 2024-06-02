"use client";
import React from "react";
import Daycard from "./daycard";

const Daysection = ({ data }) => {
  return (
    <div className="max-w-5xl w-full flex flex-col items-center pb-11 px-6 md:px-6 xl:px-0">
      <div className="w-full grid gap-2">
        {data.map((e, index) => (
          <Daycard data={e} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Daysection;
