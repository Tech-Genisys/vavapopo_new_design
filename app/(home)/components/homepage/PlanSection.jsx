"use client";
import React from "react";
import { useInView, animated, useSpring } from "@react-spring/web";
import Link from "next/link";

const PlanSection = () => {
  const [ref, inView] = useInView();
  const styles = useSpring({
    scale: inView ? 1.5 : 0,
    config: {
      tension: 300,
    },
  });

  return (
    <div className="w-full flex justify-center min-h-[800px] md:min-h-screen relative z-10 bg-[#F0FFF1]">
      <div className="flex  items-center justify-center sm:justify-normal flex-col gap-3 sm:mt-36 lg:mt-20 px-8">
        <h1 className="text-center max-w-md font-bold text-2xl sm:text-4xl tracking-wider">
          Ready to plan your trip in half the time ?
        </h1>
        <p className="font-medium  text-blue-gray-200  text-base sm:text-lg max-w-md text-center">
          So many trip, so little time, Let Trip lt worry about the details , so
          you don’t have to
        </p>
        <Link href="/booking/custom">
          <button className="bg-[#56BD80] text-white font-semibold text-lg px-4 py-1 rounded-full shadow mt-6">
            Get a custom package
          </button>
        </Link>
      </div>
      <animated.div style={styles} ref={ref}>
        {inView ? (
          <img
            src="/plan/kakka.svg"
            alt=""
            className="absolute -z-20 top-64 right-48 w-1/12"
          />
        ) : null}
      </animated.div>
      <img
        src="/plan/cloud.svg"
        alt=""
        className="absolute -z-20 top-52 left-9 w-1/4"
      />
      <img
        src="/plan/cloud2.svg"
        alt=""
        className="absolute -z-20 top-48 right-12 w-1/6"
      />
      <img
        src="/plan/cloud2.svg"
        alt=""
        className="absolute -z-20 top-72 right-60 w-1/12"
      />
      <img
        src="/plan/kakka.svg"
        alt=""
        className="absolute -z-20 top-64 right-48 w-1/12"
      />
      <div className="absolute -bottom-1 -z-10 w-full">
        <img src="/plan/planHero.svg" alt="" className="w-full" />
      </div>
    </div>
  );
};

export default PlanSection;
