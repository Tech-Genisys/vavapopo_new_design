"use client";
import { useEffect, useState } from "react";
import ExclusiveSection from "./components/homepage/ExclusiveSection";
import HashTagSection from "./components/homepage/HashTagSection";
import PlanSection from "./components/homepage/PlanSection";
import Aboutsection from "./components/homepage/aboutsection";
import Footersection from "./components/homepage/footersection";
import Fullpageimagesection from "./components/homepage/fullpageimage";
import Herosection from "./components/homepage/herosection";
import { Parallax } from "@react-spring/parallax";
import { collection, getDocs, limit } from "@firebase/firestore";
import { db } from "../firebase/firebaseinit";
import ReviewRapingDiv from "./components/homepage/ReviewSection";

export default function Home() {
  const [reviews, setReivews] = useState([]);
  const [isReiviewLoading, setIsReviewLoading] = useState(true);
  const getReviews = async () => {
    const res = await getDocs(collection(db, "review"), limit(5));
    setReivews(res.docs.map((doc) => doc.data()));
    setIsReviewLoading(false);
  };

  useEffect(() => {
    getReviews();
  }, []);
  return (
    <Parallax>
      <Herosection />
      <Aboutsection />
      <Fullpageimagesection />
      <ExclusiveSection />
      <ReviewRapingDiv isLoading={isReiviewLoading} reviews={reviews} />
      <HashTagSection />
      <PlanSection />
      <Footersection />
    </Parallax>
  );
}
