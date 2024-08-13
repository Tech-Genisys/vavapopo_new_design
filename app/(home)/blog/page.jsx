import { db } from "@/app/firebase/firebaseinit";
import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";

const { default: BlogClientPage } = require("./componets/blogClientSide");

const PAGE_LIMIT = 20;

const getBlogCount = async () => {
  const q = query(collection(db, "blogs"));
  const snapshot = await getCountFromServer(q);
  return snapshot.data().count;
};

const getBlogData = async () => {
  try {
    const q = query(
      collection(db, "blogs"),
      orderBy("date", "desc"),
      limit(PAGE_LIMIT)
    );

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
      const totalBlogs = await getBlogCount();
      return {
        data: blogsData,
        lastDocId: blogsData[blogsData.length - 1].id,
        totalBlogs,
      };
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
    <BlogClientPage
      PAGE_LIMIT={PAGE_LIMIT}
      initBlogsData={blogs.data}
      initLastDocId={blogs.lastDocId}
      totalBlogs={blogs.totalBlogs}
    />
  );
};

export default Page;
