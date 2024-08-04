"use client ";
import React from "react";
import MDEditor from "@uiw/react-md-editor";

const MarkdownEditer = () => {
  return (
    <div className="w-full">
      <MDEditor value={value} onChange={setValue} />
      <MDEditor.Markdown source={value} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
};

export default MarkdownEditer;
