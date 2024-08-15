import { Button } from "@material-tailwind/react";
import React, { useState } from "react";

function BookingListCard({
  openModal = null,
  name,
  country,
  email,
  id,
  phone,
  isReq = false,
  prefferedPackage,
  sendFeedbackEmail = false,
  emailSend = false,
}) {
  const [hadSendEmail, setHadSendEmail] = useState(emailSend);
  const handleEmailSend = async () => {
    const emailData = {
      receivers: [
        {
          email,
          id,
        },
      ],
      templateId: "d-93d5a7221b7147599446506c9cf13bf2",
      dynamicTemplateData: {
        link: `https://vavapopo-new-design.vercel.app/review/${id}`,
        subject: "Write a feedback of our service.",
        name,
      },
    };

    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/email`, {
      method: "POST",
      body: JSON.stringify(emailData),
    });

    const status = (await res.json()).message;
    if (status == "success") {
      setHadSendEmail(true);
    }
    alert(status);
  };
  return (
    <div className="p-4 border-b border-gray-300 grid grid-cols-1 md:grid-cols-4 max-w-5xl">
      <div className="w-full col-span-3">
        <p className="text-sm mb-1">
          <span className="font-medium text-[16px]">Name: </span>
          {name}
        </p>
        <p className="text-sm mb-2">
          <span className="font-medium text-[16px]">Country: </span>
          {country}
        </p>
        <div className="flex gap-2 flex-wrap md:gap-5 text-sm">
          <p className="text-sm py-1 px-3 rounded-full bg-gray-200">
            <span className="font-medium">Package: </span>
            {prefferedPackage}
          </p>
          <p className="text-sm py-1 px-3 rounded-full bg-gray-200">
            <span className="font-medium">Email: </span>
            {email}
          </p>
          <p className="text-sm py-1 px-3 rounded-full bg-gray-200">
            <span className="font-medium">Phone: </span>
            {phone}
          </p>
        </div>
      </div>
      {isReq && (
        <div className="flex justify-end items-center mt-5 md:mt-0">
          <button
            className="py-2 px-10 rounded-md bg-gradient-to-b from-gray-800 to-gray-900 text-white font-medium text-sm shadow hover:scale-105"
            onClick={() => {
              openModal(phone, id);
            }}
          >
            CALL
          </button>
        </div>
      )}
      {sendFeedbackEmail &&
        (hadSendEmail ? (
          <div className="col-span-4 w-full text-center py-3 mt-5 border border-blue-300 rounded-lg text-blue-300 font-bold text-xs">
            FEEDBACK EMAIL ALREADY SEND
          </div>
        ) : (
          <Button
            variant="gradient"
            color="black"
            className="mt-5 col-span-4"
            onClick={handleEmailSend}
          >
            Send Feedback Email
          </Button>
        ))}
    </div>
  );
}

export default BookingListCard;
