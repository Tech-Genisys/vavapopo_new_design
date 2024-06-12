"use client";
import React, { useEffect, useState } from "react";
import ReviewCard from "./Review/ReviewCard";
import { useSpringCarousel } from "react-spring-carousel";
import { db } from "@/app/firebase/firebaseinit";
import { collection, getDocs, limit } from "firebase/firestore";

const ReviewRapingDiv = () => {
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
  if (!reviews.length || reviews.length < 3) return <div></div>;
  if (isReiviewLoading) return <p>Loading..</p>;

  return <ReviewSection reviews={reviews} />;
};

const ReviewSection = ({ reviews }) => {
  const {
    carouselFragment,
    useListenToCustomEvent,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    itemsPerSlide: 3,
    gutter: 10,
    withLoop: true,
    items: reviews.map((item, index) => {
      return {
        id: index,
        renderItem: (
          <ReviewCard
            name={item.name}
            country={item.country}
            description={item.description}
            rating={item.rating}
            key={index}
          />
        ),
      };
    }),
  });

  return (
    <div
      className=" flex justify-center items-center py-24 sm:px-0 bg-background overflow-hidden"
      id="review"
    >
      <div className="max-w-5xl flex flex-col items-center  px-7">
        <h1
          className="text-3xl font-semibold max-w-md text-center"
          data-aos="fade"
          data-aos-duration="500"
        >
          Traveler Review After Successful Tours
        </h1>
        <div className="flex w-full justify-center mt-5 lg:justify-end mb-8">
          <div className="flex gap-3">
            <button onClick={slideToPrevItem}>
              <img src="/exclusive/leftArrow.svg" alt="asd" />
            </button>
            <button onClick={slideToNextItem}>
              <img src="/exclusive/rightArrow.svg" alt="as" />
            </button>
          </div>
        </div>
        <div className="w-full max-w-5xl sm:py-0 py-4">{carouselFragment}</div>
      </div>
    </div>
  );
};

export default ReviewRapingDiv;
