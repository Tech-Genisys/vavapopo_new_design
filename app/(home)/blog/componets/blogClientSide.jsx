"use client";
import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar";
import Footersection from "../../components/homepage/footersection";
import Blogcard from "./blogcard";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";

const BlogClientPage = ({
  PAGE_LIMIT,
  initBlogsData,
  initLastDocId,
  totalBlogs,
}) => {
  const [blogData, setBlogData] = useState(initBlogsData);
  const [lastDoc, setLastDoc] = useState(null);
  const [loadingInitLastDoc, setLoadingInitLastDoc] = useState(true);

  const getInitLastDoc = async () => {
    try {
      const docRef = doc(db, "blogs", initLastDocId);
      setLastDoc(await getDoc(docRef));
      setLoadingInitLastDoc(false);
    } catch (error) {
      console.log(error);
      setLoadingInitLastDoc(false);
      return null;
    }
  };

  const getBlogData = async (lastDocRef = null) => {
    try {
      let q;
      if (lastDocRef) {
        q = query(
          collection(db, "blogs"),
          orderBy("date", "desc"),
          startAfter(lastDocRef),
          limit(PAGE_LIMIT)
        );
      } else {
        q = query(
          collection(db, "blogs"),
          orderBy("date", "desc"),
          limit(PAGE_LIMIT)
        );
      }
      const blog = await getDocs(q);
      if (!blog.empty) {
        const blogsData = [];
        blog.forEach((item) => {
          const data = item.data();
          blogsData.push({
            ...data,
            id: item.id,
            date: new Intl.DateTimeFormat("en-CA").format(data.date.toDate()),
          });
        });
        const _lastDoc = blog.docs[blog.docs.length - 1];
        return { data: blogsData, lastDoc: _lastDoc };
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const loadMore = async () => {
    const data = await getBlogData(lastDoc);
    if (!data) return;
    setBlogData((prev) => [...prev, ...data.data]);
    setLastDoc(data.lastDoc);
  };

  useEffect(() => {
    getInitLastDoc();
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-[600px] py-10">
        <>
          <h1 className="text-4xl font-semibold mt-20 text-center md:text-left ">
            Explore our latest stories
          </h1>
          <div className=" mt-2 md:mt-3 w-full px-2 py-8 max-w-5xl">
            {blogData ? (
              blogData.map((item) => (
                <Blogcard
                  title={item.blogTitle}
                  image={item.coverImage.url}
                  date={item.date}
                  description={item.description}
                  tags={item.tags}
                  id={item.id}
                  readTime={item.readTime}
                />
              ))
            ) : (
              <p className="text-center">No blogs found</p>
            )}
          </div>
          <div>
            {blogData.length < totalBlogs && (
              <button
                onClick={loadMore}
                className="px-4 py-2 rounded-md bg-foreground text-white font-medium hover:shadow-xl disabled:bg-green-400 disabled:cursor-not-allowed"
                disabled={loadingInitLastDoc}
              >
                Load More
              </button>
            )}
          </div>
        </>
      </div>
      <Footersection />
    </div>
  );
};

export default BlogClientPage;
