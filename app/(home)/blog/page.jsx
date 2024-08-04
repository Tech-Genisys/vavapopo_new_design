import React from "react";
import Navbar from "../components/navbar";
import Footersection from "../components/homepage/footersection";
import Blogcard from "./componets/blogcard";

const Page = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center  relative w-full">
        <Navbar />
        <div className=" mt-12 sm:mt-20 w-full px-2 py-8 max-w-5xl">
          <Blogcard
            description={`Planning a trip to Dubai? This bustling metropolis in the United Arab Emirates is known for its ultramodern architecture, luxury shopping, and vibrant nightlife. Before you jet off to this fascinating destination, here are 13 things you should know to make the most of your visit, inspired by travel writer Lara Brunt.`}
          />
          <Blogcard
            description={`Planning a trip to Dubai? This bustling metropolis in the United Arab Emirates is known for its ultramodern architecture, luxury shopping, and vibrant nightlife. Before you jet off to this fascinating destination, here are 13 things you should know to make the most of your visit, inspired by travel writer Lara Brunt.`}
          />
        </div>
      </div>
      <Footersection />
    </div>
  );
};

export default Page;
