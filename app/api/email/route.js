import { db } from "@/app/firebase/firebaseinit";
import sgMail from "@sendgrid/mail";
import { doc, updateDoc } from "firebase/firestore";
import { NextResponse } from "next/server";

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_APIKEY);

const updateBookingRequest = async (id) => {
  try {
    const docRef = doc(db, "booking", id);
    await updateDoc(docRef, { sendFeedbackEmail: true });
  } catch (error) {
    console.log(error);
  }
};

export async function POST(request) {
  const { receivers, templateId, dynamicTemplateData } = await request.json();
  const to = [];
  receivers.forEach((reciver) => {
    to.push(reciver.email);
  });
  const msg = {
    to,
    from: {
      email: "kethankrkofficial@gmail.com",
      name: "Vavapopo",
    },
    templateId,
    dynamicTemplateData,
  };
  try {
    await sgMail.send(msg);
    for (const reciver of receivers) {
      await updateBookingRequest(reciver.id);
    }
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Failed" });
  }
}
