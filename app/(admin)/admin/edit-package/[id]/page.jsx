"use client";
import { db, imageDb } from "@/app/firebase/firebaseinit";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import DayInputUpdate from "../components/daysInputUpdate";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

function EditPage({ params }) {
  const { id } = params;
  const [packageData, setPackageData] = useState({});
  const [daysData, setDaysData] = useState([]);

  const [daysInput, setDaysInput] = useState([]);
  const [unsavedChange, setUnsavedChange] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textAreaRef = useRef(null);

  const router = useRouter();

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, packageData.description]);

  const getPackageData = async () => {
    const docRef = doc(collection(db, "packages"), id);
    const res = await getDoc(docRef);
    if (!res.exists()) {
      return <h1>Package not found</h1>;
    }
    const resData = res.data();
    resData.days.forEach((item) => {
      item.existingImage = item.images;
      item.images = [];
    });
    setDaysData(resData.days);
    const newList = resData.days.map((item) => {
      return (
        <DayInputUpdate
          day={2}
          deleteDay={() => handleDeleteComponent(item.id)}
          setDaysData={setDaysData}
          setUnsaved={setUnsavedChange}
          updateStateData={item}
          id={item.id}
          key={item.id}
        />
      );
    });
    setDaysInput(newList);
    setPackageData(res.data());
  };

  useEffect(() => {
    getPackageData();
  }, []);

  const handleDeleteComponent = (id) => {
    setDaysInput((prev) => {
      const newList = prev.filter((item) => {
        return item.key != id;
      });
      return newList;
    });
    setDaysData((prev) =>
      prev.filter((item) => {
        return item.id != id;
      })
    );
    setUnsavedChange(false);
  };

  const uploadFileToFirebase = async (images) => {
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const storageRef = ref(imageDb, `images/${v4()}`);
      console.log(`Uploading to firestorage: ${images[i]}`);
      const uploadResult = await uploadBytes(storageRef, images[i]);
      const url = await getDownloadURL(uploadResult.ref);
      imageUrls.push(url);
    }
    return imageUrls;
  };

  const submitPackage = async () => {
    setIsSubmitting(true);
    toast.info("Updating....", {
      toastId: "update-toast",
      autoClose: false,
      theme: "colored",
      closeOnClick: false,
    });
    const newDaysData = [];
    for (let i = 0; i < daysData.length; i++) {
      const images = daysData[i].images;
      const existingImg = daysData[i].existingImage;
      let imageUrls = await uploadFileToFirebase(images);
      if (existingImg) {
        imageUrls = imageUrls.concat(existingImg);
        console.log(`concatinated image urls: ${imageUrls}`);
      }
      newDaysData.push({ ...daysData[i], images: imageUrls });
    }
    const jsonData = {
      packageTitle: packageData.packageTitle,
      startingPrice: packageData.startingPrice,
      totalDays: daysInput.length,
      exclusive: packageData.exclusive,
      days: newDaysData,
      description: packageData.description,
    };
    try {
      const docRef = doc(db, "packages", id);
      await updateDoc(docRef, jsonData);
      console.log("Updated data in firestore ");
      toast.update("update-toast", {
        render: "Updated successfully, page will now redirect",
        type: "success",
        autoClose: 1000,
        theme: "colored",
        closeOnClick: true,
        onClose: () => {
          router.replace("/admin/packages");
        },
      });
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      toast.update("update-toast", {
        render: "Error occured",
        type: "error",
        theme: "colored",
        autoClose: 1000,
        closeOnClick: true,
        onClose: () => {},
      });
    }
  };

  const addNewDay = () => {
    setDaysInput([
      ...daysInput,
      <DayInputUpdate
        key={daysInput.length}
        setDaysData={setDaysData}
        deleteDay={() => handleDeleteComponent(daysInput.length)}
        id={daysInput.length}
        setUnsaved={setUnsavedChange}
      />,
    ]);
  };

  console.log(daysData);

  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full">
      <div className="grid grid-cols-1 gap-5 bg-white p-5 rounded-md">
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Package title:
          </label>
          <br />
          <input
            type="text"
            className="mt-2 py-1 w-full max-w-2xl rounded-md px-4 border border-gray-400"
            placeholder="Title"
            required
            value={packageData.packageTitle}
            onChange={(e) =>
              setPackageData((prev) => ({
                ...prev,
                packageTitle: e.target.value,
              }))
            }
          />
        </div>
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Starting Price:
          </label>
          <br />
          <input
            type="text"
            className="mt-2 py-1 w-full max-w-2xl rounded-md px-4 border border-gray-400"
            placeholder="Price"
            required
            value={packageData.startingPrice}
            onChange={(e) =>
              setPackageData((prev) => ({
                ...prev,
                startingPrice: e.target.value,
              }))
            }
          />
        </div>
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Package description:
          </label>
          <br />
          <textarea
            ref={textAreaRef}
            type="text"
            className="mt-2 py-1 w-full max-w-2xl rounded-md px-4 min-h-20 border border-gray-400"
            placeholder="A short description"
            value={packageData.description}
            onChange={(e) =>
              setPackageData((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            required
          ></textarea>
        </div>
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            State:
          </label>
          <br />
          <select
            className="py-1 px-6 rounded-md bg-white border border-gray-400"
            value={packageData.state}
            onChange={(e) =>
              setPackageData((prev) => ({ ...prev, state: e.target.value }))
            }
          >
            <option value="Kerala">Kerala</option>
            <option value="Goa">Goa</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Karnataka">Karnataka</option>
            <option value="West Bengal">West Bengal</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="" className="font-medium text-sm mr-2">
            Exclusive Pack:
          </label>
          <input
            type="checkbox"
            placeholder="Price"
            required
            checked={packageData.exclusive}
            onChange={(e) =>
              setPackageData((prev) => ({
                ...prev,
                exclusive: e.target.checked,
              }))
            }
          />
        </div>
        <div className="mt-10">
          {daysInput.map((item, index) => (
            <div>
              <p className="text-sm mb-1 font-medium">Day {index + 1}</p>
              {item}
            </div>
          ))}
        </div>
        <div className="flex justify-start gap-5">
          <button
            onClick={addNewDay}
            className="py-1 px-4 rounded-md bg-gradient-to-b from-gray-800 to-gray-900 text-white font-medium disabled:bg-gradient-to-b disabled:from-gray-500 disabled:to-gray-600"
            disabled={unsavedChange || isSubmitting}
          >
            Add day
          </button>
          <button
            className="py-1 px-4 rounded-md bg-gradient-to-b from-gray-800 to-gray-900 text-white font-medium disabled:bg-gradient-to-b disabled:from-gray-500 disabled:to-gray-600"
            disabled={unsavedChange || isSubmitting}
            onClick={submitPackage}
          >
            Update
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditPage;
