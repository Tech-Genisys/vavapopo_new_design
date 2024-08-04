import React from "react";

const Blogcard = ({ description }) => {
  const splitDescription = (desc, wordLimit) => {
    const words = desc.split(" ");
    if (words.length <= wordLimit) {
      return { firstPart: desc, secondPart: "" };
    }

    const firstPartWords = words.slice(0, wordLimit);
    const restWords = words.slice(wordLimit);
    const restText = restWords.join(" ");
    const fullStopIndex = restText.indexOf(".");

    const firstPart =
      firstPartWords.join(" ") +
      (fullStopIndex !== -1 ? restText.slice(0, fullStopIndex + 1) : "");
    const secondPart =
      fullStopIndex !== -1 ? restText.slice(fullStopIndex + 1).trim() : "";

    return { firstPart, secondPart };
  };

  const { firstPart, secondPart } = description
    ? splitDescription(description, 15)
    : { firstPart: "Loading", secondPart: "Loading" };
  return (
    <div className="flex gap-3 items-center hover:shadow-md px-2 py-2 hover:rounded-2xl mb-4">
      <img
        src="https://lp-cms-production.imgix.net/2024-06/GettyImages-1238703443.jpg?w=1440&h=810&fit=crop&auto=format&q=75"
        alt=""
        className="rounded-xl w-32 h-32 sm:h-56 sm:w-56 object-cover"
      />
      <div className=" flex flex-col">
        <div className="flex">
          <p className="bg-background px-2 sm:px-3 font-semibold rounded-full text-xs sm:text-base mb-1 sm:mb-3">
            Travel
          </p>
        </div>
        <h1 className="text-black text-base sm:text-2xl font-semibold max-w-3xl">
          13 things to know before going to Dubai Lara Brunt
        </h1>
        <div className="flex sm:gap-3 mt-3 text-xs sm :text-sm gap-1">
          <div className="flex gap-1 text-gray-800 items-center">
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

            <p className="font-medium ">21/04/2025</p>
          </div>
          <div className="flex gap-1 text-gray-800 items-center">
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
            <p className="font-medium">2 MIN READ</p>
          </div>
        </div>
        <p className="text-base font-semibold sm:block hidden mt-3 text-gray-800">
          {firstPart}
        </p>
      </div>
    </div>
  );
};

export default Blogcard;
