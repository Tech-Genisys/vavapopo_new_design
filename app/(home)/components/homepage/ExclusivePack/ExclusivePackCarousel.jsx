"use client";
import React, { useEffect, useState } from "react";
import { useSpringCarousel } from "react-spring-carousel";
import ExclusivePackCard from "./ExclusivePackCard";

const ExclusivePackCarousel = ({ itemList }) => {
  const [activeItem, setActiveItem] = useState(0);

  const newList = itemList.map((data, index) => {
    return {
      id: index,
      renderItem: (
        <div className="">
          <ExclusivePackCard
            key={index}
            id={data.id}
            size={activeItem === index ? " " : " scale-75"}
            image={data.days[0].images[0]}
            name={data.packageTitle}
            state={data.state}
            price={data.startingPrice}
          />
        </div>
      ),
    };
  });

  const {
    carouselFragment,
    useListenToCustomEvent,
    slideToPrevItem,
    slideToNextItem,
  } = useSpringCarousel({
    itemsPerSlide: 1,
    gutter: 10,
    // slideType: "fluid",
    withLoop: true,
    items: newList,
  });

  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      setActiveItem(Number(event.nextItem.id));
    }
  });
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) return;

    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
      slideToNextItem();
    }, 5000);

    return () => clearInterval(timerId);
  }, [timeLeft]);
  return (
    <div className="max-w-xl mx-auto relative">
      {carouselFragment}
      <div className="flex justify-center gap-2 ">
        <button onClick={slideToPrevItem}>
          <img src="/exclusive/leftArrow.svg" alt="asd" />
        </button>
        <button onClick={slideToNextItem}>
          <img src="/exclusive/rightArrow.svg" alt="as" />
        </button>
      </div>
    </div>
  );
};

export default ExclusivePackCarousel;
