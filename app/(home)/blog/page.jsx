import React from "react";
import Navbar from "../components/navbar";
import Footersection from "../components/homepage/footersection";
import Blogcard from "./componets/blogcard";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";

const getBlogData = async () => {
  try {
    const collectionRef = collection(db, "blogs");
    const blog = await getDocs(collectionRef);
    if (!blog.empty) {
      const blogsData = [];
      blog.forEach((item) => {
        blogsData.push({ ...item.data(), id: item.id });
      });
      return blogsData;
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

const Page = async () => {
  const blogs = await getBlogData();
  return (
    <div className="w-full flex flex-col items-center">
      <div className="flex flex-col items-center  relative w-full">
        <Navbar />
        <div className=" mt-12 md:mt-20 w-full px-2 py-8 max-w-5xl min-h-[600px]">
          {blogs ? (
            blogs.map((item) => (
              <Blogcard
                title={item.blogTitle}
                image={item.coverImage.url}
                date={new Intl.DateTimeFormat("en-CA").format(
                  item.date.toDate()
                )}
                description={item.blog.slice(0, 300)}
                tags={item.tags}
                id={item.id}
              />
            ))
          ) : (
            <p className="text-center">No blogs found</p>
          )}
        </div>
      </div>
      <Footersection />
    </div>
  );
};

export default Page;
