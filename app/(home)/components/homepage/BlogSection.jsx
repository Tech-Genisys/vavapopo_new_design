import React from "react";
import Blogcard from "../../blog/componets/blogcard";
import Blogmaincard from "./blogs/blogmaincard";
import Blogsidecard from "./blogs/blogsidecard";

const BlogSection = () => {
  return (
    <div className="w-full flex justify-center bg-background py-6 sm:px-6 px-2">
      <div className="w-full max-w-7xl">
        <div className="flex w-full justify-between">
          <h1 className="text-4xl font-semibold mb-7">
            Explore our latest stories
          </h1>
          <div className="flex items-end">
            <p className="border px-3 py-1 rounded-full border-black font-medium hover:shadow sm:text-xs hover:bg-white hidden sm:block md:text-base">
              Read more
            </p>
          </div>
        </div>
        <div className="w-full grid md:grid-cols-5 gap-2 mt-5">
          <div className="md:col-span-3">
            <Blogmaincard />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2">
            <Blogsidecard />
            <Blogsidecard />
            <Blogsidecard />
          </div>
        </div>
        <div className="sm:hidden flex justify-center">
          <p className="border px-3 py-1 rounded-full border-black font-medium hover:shadow sm:text-xs hover:bg-white mt-6 md:text-base">
            Read more
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;
