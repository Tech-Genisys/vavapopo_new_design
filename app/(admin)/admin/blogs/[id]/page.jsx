import React from "react";
import AddBlogPage from "../../add-blog/page";
import { db } from "@/app/firebase/firebaseinit";
import { doc, getDoc } from "firebase/firestore";

export const revalidate = 0;

async function EditBlogPage({ params }) {
  const { id } = params;
  const getBlogData = async () => {
    const docRef = doc(db, "blogs", id);
    const data = await getDoc(docRef);
    return {
      id: data.id,
      ...data.data(),
    };
  };
  const data = await getBlogData();
  return <AddBlogPage initData={data} />;
}

export default EditBlogPage;
