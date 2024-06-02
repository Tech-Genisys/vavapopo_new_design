"use client";
import React, { useState } from "react";
import Navbar from "../components/navbar";
import {
  Button,
  Input,
  Option,
  Rating,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import { addDoc, collection } from "@firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Page = () => {
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const [name, setName] = useState("");
  const [countryState, setCountryState] = useState("");
  const [description, setDescription] = useState("");
  const [rating, setRating] = useState(3);

  const router = useRouter();

  const submitReview = async (e) => {
    e.preventDefault();
    toast.info("Uploading data...", {
      toastId: "review-toast",
      autoClose: false,
      theme: "colored",
      closeOnClick: false,
    });
    try {
      const data = {
        name,
        country: countryState,
        description,
        rating,
      };

      await addDoc(collection(db, "review"), data);
      toast.update("review-toast", {
        render: "Review successfull",
        type: "success",
        autoClose: 1000,
        closeOnClick: true,
        onClose: () => {
          router.replace("/");
        },
      });
    } catch (error) {
      console.log(error);
      toast.update("review-toast", {
        render: "Request Failed",
        type: "error",
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4  sm:py-16">
      <Navbar />
      <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-2xl flex flex-col justify-around items-center border">
        <form
          className="w-full md:max-w-full max-w-xl flex flex-col gap-11 md:gap-2 md:flex-row "
          onSubmit={submitReview}
        >
          <div className="min-w-[300px] flex flex-col items-center justify-around">
            <Typography
              variant="h3"
              className="text-center text-2xl sm:text-3xl md:text-4xl"
            >
              Add Review
            </Typography>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-32 md:block hidden"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
              />
            </svg>
          </div>
          <div className="flex flex-col items-start gap-4 px-5 w-full">
            <div className="w-full">
              <Input
                required
                label="Enter your name"
                className="min-w-[100px] w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-full">
              <Select
                className="min-w-[200px] w-full"
                size="lg"
                label="Select Country"
                onChange={(e) => setCountryState(e)}
                selected={(element) =>
                  element &&
                  React.cloneElement(element, {
                    disabled: true,
                    className:
                      "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                  })
                }
              >
                {countries.map(({ name, flags }, index) => (
                  <Option
                    onClick={() => setCountry(index)}
                    key={name}
                    value={name}
                    className="flex items-center gap-2"
                  >
                    <img
                      src={flags.svg}
                      alt={name}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                    {name}
                  </Option>
                ))}
              </Select>
            </div>
            <Rating
              value={rating}
              className=""
              onChange={(e) => setRating(e)}
            />
            <div className="w-full">
              <Textarea
                required
                label="Message"
                className="min-w-[200px] w-full"
                maxLength={250}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button
              color="green"
              variant="gradient"
              className="w-full"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Page;
