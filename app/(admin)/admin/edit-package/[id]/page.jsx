"use client";
import { db, imageDb } from "@/app/firebase/firebaseinit";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import DayInputUpdate from "../components/daysInputUpdate";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { v4 } from "uuid";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import RevalidationHelper from "@/app/helpers/revalidationHelper";

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
      return redirect("/404");
    }
    const resData = res.data();
    resData.days.forEach((item) => {
      item.existingImage = item.images;
      item.images = [];
    });
    setDaysData(resData.days);
    const newList = resData.days.map((item, index) => {
      return (
        <DayInputUpdate
          day={index == 0 ? 1 : 2}
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
      const imageName = `images/${v4()}`;
      const storageRef = ref(imageDb, imageName);
      console.log(`Uploading to firestorage: ${images[i]}`);
      const uploadResult = await uploadBytes(storageRef, images[i]);
      const url = await getDownloadURL(uploadResult.ref);
      imageUrls.push({ url: url, path: imageName });
    }
    return imageUrls;
  };

  const deleteImageFunc = async (imageUrls) => {
    try {
      for (const imageUrl of imageUrls) {
        const imageRef = ref(imageDb, imageUrl.path);
        await deleteObject(imageRef);
      }
    } catch (error) {
      console.log(error);
    }
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
      const deletedImage = daysData[i].deletedImage;
      if (deletedImage) await deleteImageFunc(deletedImage);
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
      date: new Date(),
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
      await RevalidationHelper("/packs");
      if (packageData.exclusive)
        await RevalidationHelper("homepage_exc", "tag");
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
            className="mt-2 custom-input"
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
            className="mt-2 custom-input"
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
            className="mt-2 custom-input"
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
            className="mt-2 custom-input"
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
            <div className="mt-5">
              <p className="text-sm mb-1 font-medium">Day {index + 1}</p>
              {item}
            </div>
          ))}
        </div>
        <div className="flex justify-start gap-5">
          <Button
            onClick={addNewDay}
            variant="gradient"
            color="blue"
            disabled={unsavedChange || isSubmitting}
          >
            Add day
          </Button>
          <Button
            variant="gradient"
            color="green"
            disabled={unsavedChange || isSubmitting}
            onClick={submitPackage}
          >
            Update
          </Button>
          <Link href="/admin/packages">
            <Button color="blue-gray" variant="gradient">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default EditPage;
