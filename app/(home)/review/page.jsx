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

  const ThankYou = (
    <div className="flex flex-col items-center justify-center min-h-screen px-4  sm:py-16">
      <Navbar />
      <div className="w-full max-w-4xl p-6 bg-white shadow-xl rounded-xl flex flex-col justify-around  border">
        <h1 className="text-3xl font-semibold mb-7">
          Thank You for Your Review!
        </h1>
        <p className="">
          We sincerely appreciate the time you took to provide us with your
          feedback. Your insights help us to continually improve and serve you
          better.
        </p>
        <p className="mt-3">
          {`  We're thrilled to hear that you had a positive experience. If you have
          any additional thoughts or questions, please don't hesitate to reach
          out. Thank you once again for your support!`}
        </p>
        <p className="mt-5">Best regards,</p>
        <p className="font-semibold">The Vavapopo Team</p>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4  sm:py-16">
      <Navbar />
      <div className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-xl flex flex-col justify-around items-center border">
        <form
          className="w-full md:max-w-full max-w-xl flex flex-col gap-11 md:gap-2 md:flex-row "
          onSubmit={submitReview}
        >
          <div className="flex flex-col items-start gap-4 px-5 w-full">
            <h1 className="text-3xl font-bold mb-5">Leave a review</h1>
            <div className="w-full ">
              <Input
                required
                label="Enter your name"
                className=""
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
            <div className="">
              <Rating
                value={rating}
                className=""
                onChange={(e) => setRating(e)}
              />
            </div>
            <div className="w-full">
              <Textarea
                required
                label="Review"
                className="min-w-[200px] w-full"
                maxLength={250}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <Button
              disabled={
                name === "" || description === "" || countryState === ""
              }
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
