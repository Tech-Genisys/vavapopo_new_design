import { db } from "@/app/firebase/firebaseinit";
import { doc, getDoc } from "@firebase/firestore";
import React from "react";
import ReviewClientsidePage from "./reviewClientsidePage";
import { redirect } from "next/navigation";

const verifyUser = async (id) => {
  const docRef = doc(db, "booking", id);
  const bookingRequest = await getDoc(docRef);
  if (!bookingRequest.exists()) {
    return {
      verified: false,
      isDone: false,
    };
  }
  const data = bookingRequest.data();
  if (data.reviewed)
    return {
      verified: true,
      isDone: true,
      name: data.name,
    };
  return {
    verified: true,
    isDone: false,
    name: data.name,
  };
};

const Page = async ({ params }) => {
  const { id } = params;
  const status = await verifyUser(id);
  if(!status.verified) redirect("/404")
  return (
    <ReviewClientsidePage
      isDone={status.isDone}
      initName={status.name}
      id={id}
    />
  );
};

export default Page;
