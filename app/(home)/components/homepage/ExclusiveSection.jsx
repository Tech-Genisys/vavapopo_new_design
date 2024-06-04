"use client";
import React, { useEffect, useState } from "react";
import ExclusivePackCarousel from "./ExclusivePack/ExclusivePackCarousel";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";

const ExclusiveSection = () => {
  const [packData, setPackData] = useState([]);

  const fetchPackData = async () => {
    try {
      let res = await getDocs(
        query(collection(db, "packages"), where("exclusive", "==", true))
      );
      if (res.empty) {
        res = await getDocs(collection(db, "packages"), limit(3));
      }
      const resList = [];
      res.docs.forEach((item) => {
        const data = item.data();
        resList.push({ ...data, id: item.id });
      });
      setPackData(resList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPackData();
  }, []);
  if (!packData.length) return <div></div>;
  return (
    <div className="w-full flex justify-center min-h-screen bg-white py-0 lg:py-24 overflow-hidden border-b border-[#5BBA6F]">
      <div className="w-full max-w-5xl px-7 py-8 relative flex flex-col items-center">
        <div className="w-[98%] bg-gradient-to-b from-background to-transparent bg-opacity-20 absolute top-8 bottom-60 rounded-3xl max-h-[600px]"></div>
        <div className="flex flex-col items-center py-14 max-w-xl z-10">
          <h1
            className="font-bold text-3xl tracking-wide text-center"
            data-aos="fade-up"
            data-aos-duration="500"
          >
            Exclusive packs recommendations from our experienced Travel Experts
          </h1>
          <h1
            className="text-center mt-6 font-semibold text-sm tracking-wider"
            data-aos="fade-up"
            data-aos-duration="800"
          >
            Expertly curated travel packs, personalized by seasoned Travel
            Experts, offering exclusive recommendations for unforgettable
            journeys.
          </h1>
        </div>
        <div className="flex justify-center z-30">
          <ExclusivePackCarousel itemList={packData} />
          {/* <ExclusivePackCard /> */}
        </div>
      </div>
    </div>
  );
};

export default ExclusiveSection;
