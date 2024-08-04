import React from "react";
import Navbar from "../../components/navbar";
import Markdown from "react-markdown";
import Footersection from "../../components/homepage/footersection";
import { collection, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";
import { redirect } from "next/navigation";

const getBlogData = async (id) => {
  try {
    const docRef = collection(db, "blogs", id);
    const blog = await getDoc(docRef);
    if (blog.exists()) {
      return blog.data();
    }
    console.log("Blog not found");
    return null;
  } catch (error) {
    console.log(error)
    return null
  }
};

const Page = async ({ params }) => {
  const { id } = params;
  const blog = await getBlogData(id);
  if (!blog) {
    return redirect('/404')
  }
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center max-w-5xl relative w-full">
        <div className=" mt-12 sm:mt-20 w-full md:px-2">
          <div className="w-full relative h-[300px] sm:max-h-[500px] sm:rounded-xl overflow-hidden">
            <img
              src="https://lp-cms-production.imgix.net/2024-06/GettyImages-1238703443.jpg?w=1440&h=810&fit=crop&auto=format&q=75"
              alt=""
              className="sm:rounded-xl h-full w-full object-cover"
            />
            <div className="absolute z-40 h-full  w-full bg-gradient-to-t from-black to-transparent top-0 left-0 flex flex-col justify-end items-start px-4 py-4">
              <p className="bg-white px-2 sm:px-3 font-semibold rounded-full text-xs sm:text-lg mb-1 sm:mb-3">
                Travel
              </p>
              <h1 className="text-white text-xl sm:text-5xl font-semibold max-w-3xl">
                {blog.blogTitle}
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

                  <p className=" ">21/04/2025</p>
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
                  <p>2 MIN READ</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between w-full border-l border-r mb-24 py-4 mt-0 ">
          <div className="mt-1 px-4 markdown max-w-4xl">
            <Markdown>{blog.blog}</Markdown>
          </div>
          <div className=""></div>
        </div>
      </div>
      <Footersection />
    </div>
  );
};

export default Page;
