"use client";
import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { SvgIcon } from "@mui/material";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";
import { ToastContainer, toast } from "react-toastify";
import AlertDialog from "@/app/helpers/alert_dialog";

function Page() {
  const [inputData, setInputData] = useState("");
  const [emailData, setEmailData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);

  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    console.log("Running function");
    setIsUploading(true);
    toast.info("Uploading data, please wait...", {
      toastId: "upld",
      autoClose: false,
      closeOnClick: false,
    });
    if (!inputData || !validateEmail(inputData)) {
      toast.update("upld", {
        render: "Enter a valid email",
        type: "error",
        pauseOnHover: false,
        pauseOnFocusLoss: false,
        autoClose: 750,
      });
      setIsUploading(false);
      return;
    }
    try {
      const notificationCollection = collection(db, "notification");
      const uploadedData = await addDoc(notificationCollection, {
        email: inputData,
      });
      setEmailData((prev) => [
        ...prev,
        { id: uploadedData.id, email: inputData },
      ]);
      setInputData("");
      setIsUploading(false);
      toast.update("upld", {
        render: `Successfully added ${inputData} to notification emails`,
        type: "success",
        autoClose: 2500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    } catch (error) {
      console.log(error);
      setIsUploading(false);
      toast.update("upld", {
        render: `Failed, Error: ${error.message}`,
        type: "error",
        autoClose: 1500,
        pauseOnHover: false,
        pauseOnFocusLoss: false,
      });
    }
  };

  const handleEmailDelete = async (id) => {
    toast.info("deleting email, please wait..", {
      toastId: "dltEmail",
      autoClose: false,
      closeOnClick: false,
    });
    try {
      const docRef = doc(db, "notification", id);
      await deleteDoc(docRef);
      setEmailData((prev) => prev.filter((item) => item.id != id));
      toast.update("dltEmail", {
        render: "Successfully deleted the email.",
        autoClose: 750,
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast.update("dltEmail", {
        render: "Failed to deleted the email.",
        autoClose: 750,
        type: "error",
      });
    }
  };

  const getEmailData = async () => {
    const snapshot = await getDocs(collection(db, "notification"));
    const finalData = [];
    snapshot.forEach((item) => {
      finalData.push({
        id: item.id,
        ...item.data(),
      });
    });
    setEmailData(finalData);
    setIsLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getEmailData();
    })();
  }, []);
  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full">
      <ToastContainer />
      <p className="font-medium mb-10">Subscribe to email notification</p>
      <div className="bg-white p-5 rounded-md">
        <form className="max-w-2xl flex gap-2" onSubmit={handleEmailSubmit}>
          <Input
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
            variant="outlined"
            label="Email"
            placeholder="Enter your email"
          />
          <Button type="submit" disabled={isUploading}>
            Submit
          </Button>
        </form>
        <div className="mt-10 flex gap-5 flex-wrap">
          {isLoading ? (
            <p>Loading..</p>
          ) : (
            emailData.map((item) => (
              <div className="flex gap-2 px-3 py-1 bg-blue-gray-50 w-fit rounded-xl">
                <p>{item.email}</p>
                <AlertDialog
                  title="Delete this email?"
                  description={`Are your sure you want to delete ${item.email}?`}
                  onConfirm={() => handleEmailDelete(item.id)}
                  btn={
                    <SvgIcon color="white" className="hover:shadow-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="size-6 hover:scale-105"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </SvgIcon>
                  }
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
