"use client";
import { Button } from "@material-tailwind/react";
import MDEditor from "@uiw/react-md-editor";
import React, { useState } from "react";

const Page = () => {
  //   const [markdown, setMarkdown] = useState("Nothing");
  const [data, setData] = useState({
    blogTitle: "",
    coverImage: null,
    tags: [],
    blog: "",
  });
  const [tag, setTag] = useState("");

  const addTags = () => {
    if (tag.trim() !== "") {
      const newTags = [...data.tags, tag];
      setData({ ...data, tags: newTags });
      setTag("");
    }
  };
  const submit = () => {
    console.log(data);
  };

  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full">
      <p className="text-sm font-medium mb-10">Add Blog</p>
      <form className="grid grid-cols-1 gap-5 bg-white p-5 rounded-md">
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
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Cover image:
          </label>
          <br />
          <input
            type="file"
            className="mt-2 "
            placeholder="Cover image"
            required
            onChange={(e) =>
              setData((prev) => ({ ...prev, coverImage: e.target.files[0] }))
            }
          />
        </div>
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Blog Tags:
          </label>
          <br />
          <input
            type="text"
            className="mt-2 custom-input"
            placeholder="Tags"
            required
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          {/* <button
            type="button"
            onClick={addTags}
            className="ml-2 py-1 bg-blue-500 text-white rounded px-5"
          >
            Add
          </button> */}
          <Button
            onClick={addTags}
            disabled={tag.trim() !== "" ? false : true}
            color="blue"
            variant="gradient"
            className="ml-2 py-2.5"
          >
            {" "}
            Add
          </Button>
          <div className="mt-2">
            {data.tags.map((t, index) => (
              <span
                key={index}
                className="mr-2 p-1 px-3 bg-gray-200 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Blog :
          </label>
          <br />
          <MDEditor
            className="mt-3"
            value={data.blog}
            onChange={(value) => setData((prev) => ({ ...prev, blog: value }))}
            preview="edit"
            data-color-mode="light"
          />
        </div>
        <div className="">
          <Button color="green" variant="gradient" onClick={submit}>
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Page;
