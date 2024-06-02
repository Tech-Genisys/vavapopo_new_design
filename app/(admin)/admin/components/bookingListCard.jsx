import React from "react";

function BookingListCard({
  openModal = null,
  name,
  country,
  email,
  id,
  phone,
  isReq,
  prefferedPackage,
}) {
  return (
    <div className="p-4 border-b border-gray-300 grid grid-cols-1 md:grid-cols-4">
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
    </div>
  );
}

export default BookingListCard;
