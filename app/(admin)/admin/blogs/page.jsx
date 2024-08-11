"use client";
import Blogcard from "@/app/(home)/blog/componets/blogcard";
import { db, imageDb } from "@/app/firebase/firebaseinit";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";

function AdminBlogListPage() {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getBlogData = async () => {
    const q = query(
      collection(db, "blogs"),
      orderBy("date", "desc"),
      limit(20)
    );
    const data = await getDocs(q);
    const res = [];
    data.forEach((item) => {
      res.push({
        id: item.id,
        ...item.data(),
      });
    });
    setBlogData(res);
  };

  const deleteBlog = async (id, imagePath) => {
    try {
      const docRef = doc(db, "blogs", id);
      const imageRef = ref(imageDb, imagePath);
      await deleteObject(imageRef);
      await deleteDoc(docRef);
      setBlogData((prev) => prev.filter((item) => item.id != id));
      alert("Deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getBlogData();
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full mt-10 xl:mt-0">
      <p className="font-medium text-sm mb-2">Edit Blog</p>
      <div className="flex flex-col gap-5">
        {!isLoading &&
          blogData.map((item) => (
            <div className="p-4 bg-white shadow-md rounded-lg">
              <Blogcard
                id={item.id}
                title={item.blogTitle}
                description={item.description}
                date={new Intl.DateTimeFormat("en-CA").format(
                  item.date.toDate()
                )}
                image={item.coverImage.url}
                tags={item.tags}
              />
              <div className="flex gap-5 flex-wrap">
                <a href={`/admin/blogs/${item.id}`}>
                  <button className="px-10 py-2 bg-[#ff5722] text-white font-bold rounded-lg hover:shadow-xl min-w-[140px]">
                    Edit
                  </button>
                </a>
                <button
                  className="px-10 py-2 bg-[#fe4741] text-white font-bold rounded-lg hover:shadow-xl min-w-[140px]"
                  onClick={() => deleteBlog(item.id, item.coverImage.path)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminBlogListPage;
