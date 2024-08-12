"use client";
import { imageDb } from "@/app/firebase/firebaseinit";
import { Button } from "@material-tailwind/react";
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
    <fieldset className="shadow-md border p-4 max-w-2xl rounded-md">
      <form onSubmit={submitDay}>
        <div className="mb-2">
          <label htmlFor="" className="font-medium text-sm">
            Title:
          </label>
          <br />
          <input
            type="text"
            className="mt-2 custom-input"
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
            className="mt-2 custom-input"
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {existingImage.map((image) => (
              <div className="w-full">
                <div className="relative min-h-[150px]">
                  <Image src={image.url} fill className="w-full rounded-md" />
                </div>
                {!isSubmited && (
                  <Button
                    color="red"
                    variant="gradient"
                    className="w-full mt-2"
                    onClick={() => deleteExistingImage(image)}
                  >
                    Delete
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
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
            <Button type="submit" color="blue" variant="gradient">
              Create
            </Button>
            {day != 1 && (
              <Button
                type="button"
                color="red"
                variant="gradient"
                onClick={deleteDay}
              >
                Delete
              </Button>
            )}
          </div>
        ) : (
          <div className="flex justify-center mt-5 gap-4">
            <Button className="hidden"></Button>
            <Button
              type="button"
              variant="gradient"
              color="blue"
              onClick={() => setIsSubmited(false)}
            >
              Edit
            </Button>
          </div>
        )}
      </form>
    </fieldset>
  );
};

export default DayInputUpdate;
