import React from "react";

const Blogmaincard = ({ title, tags, image, date, duration, id }) => {
  return (
    <a href={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/${id}`}>
      <div className="w-full h-full relative">
        <div className=" absolute z-40 h-full rounded-xl  w-full bg-gradient-to-t from-black to-transparent top-0 left-0 flex flex-col justify-end items-start px-4 py-4">
          {tags.map((item, index) => {
            if (index > 2) return;
            return (
              <p key={index} className="bg-white px-2 sm:px-3 font-semibold rounded-full text-xs sm:text-lg mb-1 sm:mb-3">
                {item}
              </p>
            );
          })}
          <h1 className="text-white text-xl sm:text-5xl font-semibold max-w-3xl">
            {title}
          </h1>
          <div className="flex sm:gap-3 mt-3 text-xs sm:text-sm gap-1">
            <div className="flex gap-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-4 sm:size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                />
              </svg>

              <p className=" ">{date}</p>
            </div>
            <div className="flex gap-1 text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className=" size-4 sm:size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <p>{duration} MIN READ</p>
            </div>
          </div>
        </div>
        <img
          src={image}
          alt=""
          className="rounded-xl h-full w-full object-cover"
        />
      </div>
    </a>
  );
};

export default Blogmaincard;
