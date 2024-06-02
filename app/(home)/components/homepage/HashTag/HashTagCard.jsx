import React from "react";

const HashTagCard = ({ img, name, link }) => {
  return (
    <div className="w-full aspect-[3/4] relative">
      <img src={img} alt="" className="h-full object-cover" />{" "}
      <div className="absolute bg-gradient-to-b from-transparent to-black opacity-70 hover:opacity-5 w-full  h-full top-0"></div>
      <a
        href={link}
        className="absolute bottom-0 p-3 font-semibold tracking-wide text-white break-all whitespace-normal text-[8px] sm:text-xs md:text-sm"
      >
        @{name}
      </a>
    </div>
  );
};

export default HashTagCard;
