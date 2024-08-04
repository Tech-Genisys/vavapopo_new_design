"use client";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";

const Page = () => {
  const [markdown, setmarkdown] = useState("Nothing");
  const [data, setData] = useState({
    blogTitle: "",
  });
  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full">
      <p className="text-sm font-medium mb-10">Add Blog</p>
      <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-md">
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Blog title:
          </label>
          <br />
          <input
            type="text"
            className="mt-2 custom-input"
            placeholder="Title"
            required
            value={data.blogTitle}
            onChange={(e) =>
              setData((prev) => ({ ...prev, blogTitle: e.target.value }))
            }
          />
        </div>
        <MDEditor
          value={markdown}
          onChange={setmarkdown}
          preview="edit"
          data-color-mode="light"
        />
      </div>
    </div>
  );
};

export default Page;
