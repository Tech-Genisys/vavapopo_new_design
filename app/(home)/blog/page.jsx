"use client";
import React, { Suspense, useEffect, useState } from "react";
import Navbar from "../components/navbar";
import Footersection from "../components/homepage/footersection";
import Blogcard from "./componets/blogcard";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";

const LIMIT = 2;

const Page = () => {
  const [blogData, setBlogData] = useState(null);
  const [lastDoc, setLastDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [totalBlogs, setTotalBlogs] = useState(0);

  const getBlogCount = async () => {
    try {
      const q = query(collection(db, "blogs"));
      const snapshot = await getCountFromServer(q);
      return snapshot.data().count;
    } catch (error) {
      console.log("Error getting document count: ", error);
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
          limit(LIMIT)
        );
      } else {
        q = query(
          collection(db, "blogs"),
          orderBy("date", "desc"),
          limit(LIMIT)
        );
      }
      const blog = await getDocs(q);
      if (!blog.empty) {
        const blogsData = [];
        blog.forEach((item) => {
          blogsData.push({ ...item.data(), id: item.id });
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
    (async () => {
      const data = await getBlogData();
      if (!data) {
        setIsLoading(false);
        return;
      }
      setBlogData(data.data);
      setLastDoc(data.lastDoc);
      setTotalBlogs(await getBlogCount());
      setIsLoading(false);
    })();
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <Navbar />
      <div className="flex flex-col items-center w-full min-h-[600px] py-10">
        {isLoading ? (
          <p className="text-center mt-36">Loading...</p>
        ) : (
          <>
            <div className=" mt-12 md:mt-20 w-full px-2 py-8 max-w-5xl">
              {blogData ? (
                blogData.map((item) => (
                  <Blogcard
                    title={item.blogTitle}
                    image={item.coverImage.url}
                    date={new Intl.DateTimeFormat("en-CA").format(
                      item.date.toDate()
                    )}
                    description={item.description}
                    tags={item.tags}
                    id={item.id}
                  />
                ))
              ) : (
                <p className="text-center">No blogs found</p>
              )}
            </div>
            <div>
              {blogData.length < totalBlogs && (
                <button onClick={loadMore} className="px-4 py-2 rounded-md bg-foreground text-white font-medium hover:shadow-xl">Load More</button>
              )}
            </div>
          </>
        )}
      </div>
      <Footersection />
    </div>
  );
};

export default Page;
