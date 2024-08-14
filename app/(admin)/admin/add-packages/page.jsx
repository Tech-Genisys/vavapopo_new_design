"use client";
import { useEffect, useRef, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import DayInputFiled from "./components/dayInputFiled";
import { db, imageDb } from "@/app/firebase/firebaseinit";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import RevalidationHelper from "@/app/helpers/revalidationHelper";

function PackagesPage() {
  const [data, setData] = useState({
    packageTitle: "",
    startingPrice: "",
    totalDays: 1,
    description: "",
    exclusive: false,
    state: "Kerala",
  });
  const textAreaRef = useRef(null);
  const [daysData, setDaysData] = useState([]);

  const [daysInput, setDaysInput] = useState([]);
  const [unsavedChange, setUnsavedChange] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, data.description]);

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

  const addNewDay = () => {
    setDaysInput([
      ...daysInput,
      <DayInputFiled
        key={daysInput.length + 1}
        setDaysData={setDaysData}
        deleteDay={() => handleDeleteComponent(daysInput.length + 1)}
        id={daysInput.length + 1}
        setUnsaved={setUnsavedChange}
      />,
    ]);
  };

  const uploadFileToFirebase = async (images) => {
    const imageUrls = [];
    for (let i = 0; i < images.length; i++) {
      const imageName = `images/${v4()}`;
      const storageRef = ref(imageDb, imageName);
      const uploadResult = await uploadBytes(storageRef, images[i]);
      console.log(uploadResult);
      const url = await getDownloadURL(uploadResult.ref);
      imageUrls.push({ url: url, path: imageName });
    }
    return imageUrls;
  };

  const submitPackage = async () => {
    toast.info("Uploading data...", {
      toastId: "upload-toast",
      autoClose: false,
      closeOnClick: false,
      theme: "colored",
    });
    try {
      setIsSubmitting(true);
      const newDaysData = [];
      for (let i = 0; i < daysData.length; i++) {
        const images = daysData[i].images;
        const imageUrls = await uploadFileToFirebase(images);
        newDaysData.push({ ...daysData[i], images: imageUrls });
      }
      const jsonData = {
        ...data,
        totalDays: daysInput.length + 1,
        days: newDaysData,
        date: new Date(),
      };
      console.log(jsonData);
      const packageCollection = collection(db, "packages");
      const docRef = await addDoc(packageCollection, jsonData);
      console.log(`Added data to firestore ${docRef.id}`);
      toast.update("upload-toast", {
        render: "Successfully created package, you will be redirected",
        theme: "colored",
        type: "success",
        autoClose: 1000,
        onClose: () => {
          router.replace("/admin");
        },
      });
      await RevalidationHelper("/packs");
      if (data.exclusive) await RevalidationHelper("homepage_exc", "tag");
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      toast.update("upload-toast", {
        render: "Unkown error occured",
        type: "error",
        theme: "colored",
        autoClose: 1000,
        theme: "colored",
      });
    }
  };

  console.log(daysData);
  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full">
      <ToastContainer />
      <p className="text-sm font-medium mb-10">Packages</p>
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
            value={data.packageTitle}
            onChange={(e) =>
              setData((prev) => ({ ...prev, packageTitle: e.target.value }))
            }
          />
        </div>
        <div className="">
          <label htmlFor="" className="font-medium text-sm">
            Starting Price:
          </label>
          <br />
          <input
            type="number"
            className="mt-2 custom-input"
            placeholder="Price"
            required
            value={data.startingPrice}
            onChange={(e) =>
              setData((prev) => ({ ...prev, startingPrice: e.target.value }))
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
            value={data.description}
            onChange={(e) =>
              setData((prev) => ({ ...prev, description: e.target.value }))
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
            className="custom-input"
            value={data.state}
            onChange={(e) =>
              setData((prev) => ({ ...prev, state: e.target.value }))
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
            checked={data.exclusive}
            onChange={(e) =>
              setData((prev) => ({ ...prev, exclusive: e.target.checked }))
            }
          />
        </div>
        <div className="grid grid-cols-1 gap-6 mt-10">
          <div>
            <p className="text-sm mb-1 font-medium">Day 1</p>
            <DayInputFiled
              day={1}
              deleteDay={() => {}}
              setDaysData={setDaysData}
              setUnsaved={setUnsavedChange}
              id={0}
            />
          </div>
          {daysInput.map((item, i) => (
            <div>
              <p className="text-sm mb-1 font-medium">Day {i + 2}</p>
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
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackagesPage;
