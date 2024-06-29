"use client";
import { imageDb } from "@/app/firebase/firebaseinit";
import { SDK_VERSION } from "firebase/app";
import { deleteObject, ref } from "firebase/storage";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
const DayInputUpdate = ({
  day = 2,
  setDaysData,
  deleteDay,
  id = null,
  setUnsaved,
  updateStateData = null,
}) => {
  const textAreaRef = useRef(null);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Images, setImages] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [existingImage, setExistingImage] = useState([]);
  const [uid, setUid] = useState(null);
  console.log(id);
  useEffect(() => {
    if (updateStateData) {
      setTitle(updateStateData.title);
      setDescription(updateStateData.description);
      setExistingImage(updateStateData.existingImage);
      setIsSubmited(true);
      setUnsaved(false);
    }
  }, []);

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = "0px";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, Description]);

  if (!isSubmited) setUnsaved(true);

  const submitDay = (e) => {
    e.preventDefault();
    console.log("submitting");
    console.log(existingImage);
    setDaysData((prev) => {
      let found = false;
      const updatingData = prev.map((item) => {
        if (item.id == id) {
          found = true;
          item.title = Title;
          item.description = Description;
          item.images = Images;
          item.existingImage = existingImage;
        }
        return item;
      });
      if (found) return updatingData;
      else {
        return [
          ...prev,
          {
            title: Title,
            description: Description,
            images: Images,
            id: id,
            existingImage: existingImage,
          },
        ];
      }
    });
    setIsSubmited(true);
    setUnsaved(false);
  };

  const deleteExistingImage = async (imageUrl) => {
    const imageRef = ref(imageDb, imageUrl.path);
    try {
      await deleteObject(imageRef);
      alert("successfully deleted");
      setExistingImage((prev) => {
        return prev.filter((image) => image !== imageUrl);
      });
    } catch (e) {
      alert("error");
    }
  };

  return (
    <fieldset className="border-2 border-gray-300 p-4 max-w-2xl rounded-md">
      <form onSubmit={submitDay}>
        <div className="mb-2">
          <label htmlFor="" className="font-medium text-sm">
            Title:
          </label>
          <br />
          <input
            type="text"
            className="mt-2 py-1 w-full max-w-2xl rounded-md px-4 border border-gray-400"
            placeholder="Title"
            value={Title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={isSubmited}
          />
        </div>
        <div className="mb-2">
          <label htmlFor="" className="font-medium text-sm">
            Descrpition:
          </label>
          <br />
          <textarea
            ref={textAreaRef}
            type="text"
            className="mt-2 py-1 w-full max-w-2xl rounded-md px-4 min-h-20 border border-gray-400"
            placeholder="Title"
            value={Description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmited}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="" className="font-medium text-sm">
            Images
          </label>
          <br />
          <div className="grid grid-cols-1 gap-4">
            {existingImage.map((image) => (
              <div className="grid grid-cols-2">
                <img src={image.url} className="max-w-[300px]" />
                {!isSubmited && (
                  <div
                    className="p-1 rounded-md bg-red-500 w-fit h-fit"
                    onClick={() => deleteExistingImage(image)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                      />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="" className="font-medium text-sm">
            Add Images
          </label>
          <br />
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            required={updateStateData == null}
            disabled={isSubmited}
          />
        </div>
        {isSubmited == false ? (
          <div className="flex justify-center mt-5 gap-4">
            <button
              className="py-1 px-4 rounded-md font-medium text-white bg-green-500"
              type="submit"
            >
              Create
            </button>
            {day != 1 && (
              <button
                className="py-1 px-4 rounded-md font-medium text-white bg-red-400"
                type="button"
                onClick={deleteDay}
              >
                Delete
              </button>
            )}
          </div>
        ) : (
          <div className="flex justify-center mt-5 gap-4">
            <div
              className="py-1 px-4 rounded-md font-medium text-white bg-orange-400 cursor-pointer"
              onClick={() => setIsSubmited(false)}
            >
              Edit
            </div>
          </div>
        )}
      </form>
    </fieldset>
  );
};

export default DayInputUpdate;
