import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseinit";

export const revalidate = 30;

const getAllPackageUrls = async () => {
  const packages = await getDocs(collection(db, "packages"));
  const packagesUrl = [];
  packages.forEach((item) => {
    const data = item.data();
    packagesUrl.push({
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/trip/${item.id}`,
      lastModified: data.date,
      changeFrequency: "yearly",
      priority: 1,
    });
  });

  return packagesUrl;
};

const getAllBlogsUrls = async () => {
  const blogs = await getDocs(collection(db, "blogs"));
  const blogsUrl = [];
  blogs.forEach((item) => {
    const data = item.data();
    blogsUrl.push({
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/trip/${item.id}`,
      lastModified: data.date,
      changeFrequency: "monthly",
      priority: 1,
    });
  });

  return blogsUrl;
};

export default async function sitemap() {
  const ulrs = [
    {
      url: process.env.NEXT_PUBLIC_DOMAIN,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/packs`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/blog`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  ulrs.push(...(await getAllPackageUrls()));
  ulrs.push(...(await getAllBlogsUrls()));

  return ulrs;
}
