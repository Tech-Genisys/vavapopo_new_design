"use client";

import HashTagCard from "./HashTag/HashTagCard";

const HashTagSection = () => {
  return (
    <div className="w-full flex flex-col py-10 bg-background overflow-hidden">
      <div className="bg-dark py-5 text-white">
        <h1 className="font-bold text-2xl sm:text-3xl text-center">
          {`Through Our Visitors' Eyes`}
        </h1>
        <p
          className="text-center font-black text-2xl mt-2"
          data-aos="flip-up"
          data-aos-duration="500"
        >
          #vavapopo
        </p>
      </div>
      <div className="grid grid-cols-3 lg:grid-cols-6">
        <HashTagCard
          name={"Abhinav"}
          img={
            "https://plus.unsplash.com/premium_photo-1672505214510-18a100dd4595?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <HashTagCard
          name={"Abhinav"}
          img={
            "https://plus.unsplash.com/premium_photo-1672505214510-18a100dd4595?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <HashTagCard
          name={"Abhinav"}
          img={
            "https://plus.unsplash.com/premium_photo-1672505214510-18a100dd4595?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <HashTagCard
          name={"Abhinav"}
          img={
            "https://plus.unsplash.com/premium_photo-1672505214510-18a100dd4595?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <HashTagCard
          name={"Abhinav"}
          img={
            "https://plus.unsplash.com/premium_photo-1672505214510-18a100dd4595?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
        <HashTagCard
          name={"Abhinav"}
          img={
            "https://plus.unsplash.com/premium_photo-1672505214510-18a100dd4595?q=80&w=1937&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
        />
      </div>
      <div className="bg-dark py-8 flex justify-center gap-3 text-white w-full">
        <h1 className="font-semibold text-base">Follow Vavapopo :</h1>
        <img src="/footer/facebookIcon.svg" alt="" />
        <img src="/footer/instaIcon.svg" alt="" />
        <img src="/footer/linkedInIcon.svg" alt="" />
      </div>
    </div>
  );
};

export default HashTagSection;
