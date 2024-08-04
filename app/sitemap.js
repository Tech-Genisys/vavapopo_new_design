import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/firebaseinit";

const getAllPackageUrls = async () => {
    const packages = await getDocs(collection(db, "packages"))
    const packagesUrl = []
    packages.forEach(item => {
        const data = item.data()
        packagesUrl.push({
            url: `${process.env.NEXT_PUBLIC_DOMAIN}/trip/${item.id}`,
            lastModified: data.date,
            changeFrequency: "yearly",
            priority: 1
        })
    })

    return packagesUrl
}

export default async function sitemap() {
  const ulrs =  [
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
  ];

  ulrs.push(...(await getAllPackageUrls()))

  return ulrs
}
