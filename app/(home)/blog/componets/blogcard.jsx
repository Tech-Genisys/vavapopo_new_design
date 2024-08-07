import Image from "next/image";
import React from "react";

const Blogcard = ({
  description = "No description",
  image,
  title,
  date,
  tags = [],
  id,
}) => {
  // const markdownToPlainText = (markdown) => {
  //   return markdown
  //     .replace(/[#*>\-`~\[\]\(\)\\_]/g, "")
  //     .replace(/\!\[.*\]\(.*\)/g, "")
  //     .replace(/\[.*\]\(.*\)/g, "")
  //     .replace(/(\*\*|__)(.*?)\1/g, "$2")
  //     .replace(/(\*|_)(.*?)\1/g, "$2")
  //     .replace(/\n{2,}/g, "\n\n");
  // };

  // const splitDescription = (desc, wordLimit) => {
  //   const words = desc.split(" ");
  //   if (words.length <= wordLimit) {
  //     return { firstPart: desc, secondPart: "" };
  //   }

  //   const firstPartWords = words.slice(0, wordLimit);
  //   const restWords = words.slice(wordLimit);
  //   const restText = restWords.join(" ");
  //   const fullStopIndex = restText.indexOf(".");

  //   const firstPart =
  //     firstPartWords.join(" ") +
  //     (fullStopIndex !== -1 ? restText.slice(0, fullStopIndex + 1) : "");
  //   const secondPart =
  //     fullStopIndex !== -1 ? restText.slice(fullStopIndex + 1).trim() : "";

  //   return { firstPart, secondPart };
  // };

  // const { firstPart, secondPart } = description
  //   ? splitDescription(description, 15)
  //   : { firstPart: "Loading", secondPart: "Loading" };
  return (
    <a href={`${process.env.NEXT_PUBLIC_DOMAIN}/blog/${id}`}>
      <div className="flex gap-3 items-center shadow-sm hover:shadow-md px-2 py-2 hover:rounded-md mb-4">
        <Image
          src={image}
          alt=""
          width={3000}
          height={3000}
          priority={true}
          className="rounded-xl w-32 h-32 sm:h-56 sm:min-w-56 object-cover"
        />
        <div className=" flex flex-col">
          <div className="flex gap-2">
            {tags.map((item, index) => {
              if (index > 2) return;
              return (
                <p
                  key={index}
                  className="bg-background px-2 md:px-3 font-semibold rounded-full text-[10px] md:text-base mb-1 md:mb-3"
                >
                  {item}
                </p>
              );
            })}
          </div>
          <h1 className="text-black md:text-2xl font-semibold max-w-3xl">
            {title}
          </h1>
          <div className="flex sm:gap-3 mt-3 text-xs md:text-sm gap-1">
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

              <p className="font-medium ">{date}</p>
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
          <p className="font-medium sm:block hidden mt-3 text-gray-800">
            {/* {markdownToPlainText(firstPart)} */}
            {description}
          </p>
        </div>
      </div>
    </a>
  );
};

export default Blogcard;
