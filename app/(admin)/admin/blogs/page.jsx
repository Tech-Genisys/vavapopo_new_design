"use client";
import Blogcard from "@/app/(home)/blog/componets/blogcard";
import { db, imageDb } from "@/app/firebase/firebaseinit";
import AlertDialog from "@/app/helpers/alert_dialog";
import { Button } from "@material-tailwind/react";
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
import { ToastContainer, toast } from "react-toastify";

const PAGE_LIMIT = 30;

function AdminBlogListPage() {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const getBlogData = async (title = null) => {
    const q = query(
      collection(db, "blogs"),
      orderBy("date", "desc"),
      limit(100)
    );
    const data = await getDocs(q);
    const res = [];
    data.forEach((item) => {
      const blog = item.data();
      if (title) {
        if (blog.blogTitle.toLowerCase().includes(title.toLowerCase())) {
          res.push({
            id: item.id,
            ...blog,
          });
        }
      } else {
        res.push({
          id: item.id,
          ...blog,
        });
      }
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

  const paginatedData =
    blogData && blogData.length > PAGE_LIMIT
      ? blogData.slice(0, PAGE_LIMIT)
      : blogData;
  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full mt-10 xl:mt-0">
      <ToastContainer />
      <p className="font-medium text-sm mb-2">Edit Blog</p>
      <div className="mb-10">
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchText.trim() == "") {
              toast.error("Please enter a title", {
                type: "error",
                autoClose: 1500,
                closeOnClick: true,
                pauseOnHover: false,
              });
              return;
            }
            getBlogData(searchText);
          }}
        >
          <input
            type="text"
            placeholder="search for a package"
            className="py-1 px-4 rounded-l-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            type="submit"
            className="py-1 px-2 text-sm text-white bg-gray-900 hover:scale-105"
          >
            Search
          </button>
          <button
            type="button"
            className="py-1 px-4 text-sm text-white bg-gray-800 rounded-r-full hover:scale-105"
            onClick={() => {
              getBlogData();
              setSearchText("");
            }}
          >
            Clear
          </button>
        </form>
      </div>
      <div className="flex flex-col gap-5">
        {!isLoading &&
          paginatedData.map((item) => (
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
                readTime={item.readTime}
              />
              <div className="flex gap-5 flex-wrap">
                <a href={`/admin/blogs/${item.id}`}>
                  <Button
                    variant="gradient"
                    color="blue"
                    className="text-white min-w-[100px]"
                  >
                    Edit
                  </Button>
                </a>
                <AlertDialog
                  title="Delete Blog!"
                  description="Are you sure you want to delete this blog?"
                  onConfirm={() => deleteBlog(item.id, item.coverImage.path)}
                  btn={
                    <Button
                      variant="gradient"
                      color="red"
                      className="text-white min-w-[100px]"
                    >
                      Delete
                    </Button>
                  }
                />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default AdminBlogListPage;
