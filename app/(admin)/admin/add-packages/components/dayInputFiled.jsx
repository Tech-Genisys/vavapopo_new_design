"use client";
import { useEffect, useRef, useState } from "react";
const DayInputFiled = ({
  day = 2,
  setDaysData,
  deleteDay,
  id = null,
  setUnsaved,
}) => {
  const textAreaRef = useRef(null);
  const [Title, setTitle] = useState("");
  const [Description, setDescription] = useState("");
  const [Images, setImages] = useState([]);
  const [isSubmited, setIsSubmited] = useState(false);
  const [uid, setUid] = useState(null);
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
    setDaysData((prev) => {
      let found = false;
      const updatingData = prev.map((item) => {
        if (item.id == id) {
          found = true;
          item.title = Title;
          item.description = Description;
          item.images = Images;
        }
        return item;
      });
      if (found) return updatingData;
      else {
        return [
          ...prev,
          { title: Title, description: Description, images: Images, id: id },
        ];
      }
    });
    setIsSubmited(true);
    setUnsaved(false);
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
            placeholder="Describe the day"
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
          <input
            type="file"
            multiple
            onChange={(e) => setImages(e.target.files)}
            required
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

export default DayInputFiled;
