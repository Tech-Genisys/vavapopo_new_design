import React, { cache } from "react";
import Navbar from "../../components/navbar";
import HeroSlideSction from "../components/HeroSlideSction";
import TripCoustoSearch from "../components/TripCoustomSearch";

import { doc, getDoc } from "@firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";
import Daysection from "../components/daysection";
import { redirect } from "next/navigation";

const getPackageData = cache(async (id) => {
  try {
    const docRef = doc(db, "packages", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    console.log("No such document!");
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
});

export async function generateMetadata({ params }) {
  const { id } = params;
  const data = await getPackageData(id);
  return {
    title: data.packageTitle,
    description: data.description,
    openGraph: {
      images: data.days[0].images[0],
    },
  };
}

export default async function Page({ params }) {
  const { id } = params;
  const data = await getPackageData(id);
  if (!data) {
    return redirect("/404");
  }
  return (
    <div className="flex justify-center w-full">
      <Navbar />
      <div className="flex flex-col items-center max-w-5xl relative w-full">
        <HeroSlideSction data={data} />
        <TripCoustoSearch id={id} />
        <Daysection data={data.days} />
      </div>
    </div>
  );
}
