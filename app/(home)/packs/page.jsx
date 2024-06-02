"use client";
import React, { useEffect, useState } from "react";
import Footersection from "../components/homepage/footersection";
import Navbar from "../components/navbar";
import SearchSection from "./components/SearchSection";
import PackSection from "./components/PackSection";
import {
  and,
  collection,
  getDocs,
  limit,
  query,
  where,
  orderBy,
} from "@firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";
import { PackageCardSkeleton } from "../components/cardSkeleton";

const Page = () => {
  const [packData, setPackData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getPacks = async (state = null, days = null) => {
    const resList = [];
    try {
      if (!isLoading) {
        setIsLoading(true);
      }
      if (days) days = parseInt(days);
      let q = query(collection(db, "packages"), limit(10));
      if (state && !days) {
        q = query(
          collection(db, "packages"),
          where("state", "==", state),
          limit(10)
        );
      } else if (days && !state) {
        q = query(
          collection(db, "packages"),
          where("totalDays", "<=", days),
          orderBy("totalDays", "desc"),
          limit(10)
        );
      } else if (days && state) {
        q = query(
          collection(db, "packages"),
          where("state", "==", state),
          where("totalDays", "<=", days),
          orderBy("totalDays", "desc"),
          limit(10)
        );
      }
      const res = await getDocs(q);
      res.forEach((doc) => {
        resList.push({ id: doc.id, ...doc.data() });
      });
      setIsLoading(false);
      setPackData(resList);
      console.log(state, days);
      console.log(resList);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getPacks();
  }, []);
  return (
    <div className="">
      <Navbar />
      <SearchSection filter={getPacks} />
      {isLoading ? (
        <div className="max-w-5xl mx-auto">
          <PackageCardSkeleton />
          <PackageCardSkeleton />
          <PackageCardSkeleton />
          <PackageCardSkeleton />
        </div>
      ) : (
        <PackSection packs={packData} />
      )}
      <Footersection />
    </div>
  );
};

export default Page;
