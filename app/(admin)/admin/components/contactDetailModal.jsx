import { db } from "@/app/firebase/firebaseinit";
import { doc, updateDoc } from "@firebase/firestore";
import { useState } from "react";

function ContactDetailModal({ request, closeModal }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const updateRequest = async () => {
    setIsUpdating(true);
    try {
      const docRef = doc(db, "booking", request.id);
      await updateDoc(docRef, { status: "confirm" });
      closeModal();
    } catch (error) {
      setIsUpdating(false);
      alert("error");
    }
  };
  return (
    <div className="w-full">
      <p className="text-lg font-medium mb-1">Phone Number: </p>
      <div className="py-1 px-4 rounded-md mb-10 bg-gray-200">
        {request.phone}
      </div>
      <button
        disabled={isUpdating}
        className="py-2 px-10 rounded-md bg-gradient-to-b from-gray-800 to-gray-900 w-full font-semibold shadow-md text-white hover:scale-105 hover:shadow-xl disabled:from-gray-600 disabled:to-gray-700"
        onClick={updateRequest}
      >
        Mark Done
      </button>
    </div>
  );
}

export default ContactDetailModal;
