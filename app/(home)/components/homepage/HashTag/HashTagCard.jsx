import React from "react";

const HashTagCard = ({ image }) => {
  return (
    <div className="w-full  rounded-xl flex flex-col bg-white shadow">
      <img className="rounded-t-xl" src={image} alt="" />
      <div className="px-3 py-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <img
              src="https://images.pexels.com/photos/3183133/pexels-photo-3183133.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
              className="w-8 h-8 md:w-12 rounded-full md:h-12"
            />
            <div className="flex flex-col">
              <h1 className="font-semibold sm:text-base text-xs">
                Abhinav shyju
              </h1>
              <div className="flex gap-1 text-[8px] md:text-xs font-bold text-gray-500 flex-wrap">
                <p>@abhinav_shyju</p>
                <p> 15 minutes ago</p>
              </div>
            </div>
          </div>
          <img src="/hashtag/instagramIcons.svg" alt="" className="w-6" />
        </div>
        <p className=" text-[8px] sm:text-xs font-semibold mt-2 max-h-15 overflow-clip mb-3  ">
          witzerland’s scenic #vavapopo landscapes provided the perfect backdrop
          for an unforgettable journey with Rado as its Global Brand Ambassador,
          exploring the fascinating world of ceramic{" "}
        </p>
      </div>
    </div>
  );
};

export default HashTagCard;
