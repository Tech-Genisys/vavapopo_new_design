import React from "react";
import Blogcard from "../../blog/componets/blogcard";
import Blogmaincard from "./blogs/blogmaincard";
import Blogsidecard from "./blogs/blogsidecard";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";

const getBlogData = async () => {
  try {
    const q = query(collection(db, "blogs"), limit(4));
    const blog = await getDocs(q);
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

const BlogSection = async () => {
  const blogs = await getBlogData();
  if (!blogs || blogs.length < 4) {
    return;
  }
  const [blog1, blog2, blog3, blog4] = blogs;
  return (
    <div className="w-full flex justify-center bg-background py-6 px-6 lg:px-4">
      <div className="w-full max-w-7xl">
        <div className="flex w-full justify-center md:justify-between">
          <h1 className="text-4xl font-semibold mb-7 text-center md:text-left ">
            Explore our latest stories
          </h1>
          <div className="flex items-end">
            <p className="border px-3 py-1 rounded-full border-black font-medium hover:shadow sm:text-xs hover:bg-white hidden sm:block md:text-base">
              Read more
            </p>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 lg:grid-cols-5 gap-2 mt-5">
          <div className="lg:col-span-3">
            <Blogmaincard
              title={blog1.blogTitle}
              date={new Intl.DateTimeFormat("en-CA").format(
                blog1.date.toDate()
              )}
              tags={blog1.tags}
              image={blog1.coverImage.url}
              duration={blog1.readTime}
              id={blog1.id}
            />
          </div>
          <div className="md:col-span-2 flex flex-col gap-2 w-full">
            <Blogsidecard
              title={blog2.blogTitle}
              image={blog2.coverImage.url}
              date={new Intl.DateTimeFormat("en-CA").format(
                blog2.date.toDate()
              )}
              duration={blog2.readTime}
              id={blog2.id}
            />
            <Blogsidecard
              title={blog3.blogTitle}
              image={blog3.coverImage.url}
              date={new Intl.DateTimeFormat("en-CA").format(
                blog3.date.toDate()
              )}
              duration={blog3.readTime}
              id={blog3.id}
            />
            <Blogsidecard
              title={blog4.blogTitle}
              image={blog4.coverImage.url}
              date={new Intl.DateTimeFormat("en-CA").format(
                blog4.date.toDate()
              )}
              duration={blog4.readTime}
              id={blog4.id}
            />
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
