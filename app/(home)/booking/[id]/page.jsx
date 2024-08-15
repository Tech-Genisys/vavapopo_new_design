"use client";
import React, { useState } from "react";
import Navbar from "../../components/navbar";
import {
  Button,
  Input,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import { useCountries } from "use-react-countries";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";
import { useRouter } from "next/navigation";

export default function Page({ params }) {
  const { id } = params;
  const { countries } = useCountries();
  const [country, setCountry] = React.useState(0);
  const { name, flags, countryCallingCode } = countries[country];

  const [countryName, setcountryName] = useState(false);
  const [countryCode, setcountryCode] = useState("");
  const [phone, setphone] = useState("");
  const [userName, setuserName] = useState("");
  const [Email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const formSubmit = async () => {
    if (!countryName || !Email || !phone || !userName) {
      toast.warn("Please fill out all fields", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }
    setIsSubmitting(true);
    toast.info("Uploading data...", {
      toastId: "booking-toast",
      autoClose: false,
      theme: "colored",
      closeOnClick: false,
    });
    try {
      const bookingData = {
        country: countryName,
        phone: `${countryCode} ${phone}`,
        name: userName,
        email: Email,
        package: id,
        status: "request",
        sendFeedbackEmail: false,
        reviewed: false,
      };
      await addDoc(collection(db, "booking"), bookingData);
      toast.update("booking-toast", {
        render: "Request send successfull",
        type: "success",
        autoClose: 1500,
        closeOnClick: true,
        onClose: () => {
          router.replace("/");
        },
      });
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      toast.update("booking-toast", {
        render: "Request Failed",
        type: "error",
        autoClose: 2000,
        closeOnClick: true,
      });
    }
  };
  return (
    <div className="flex justify-center w-full">
      <ToastContainer />
      <Navbar />
      <div className="flex flex-col items-center max-w-7xl relative w-full">
        <div className="h-screen w-full flex justify-center items-center ">
          <div className=" h-[500px] min-w-[250px] w-full max-w-xl rounded-2xl shadow flex flex-col px-5 py-16 items-center justify-between relative">
            <Typography variant="h2">Get your quote</Typography>
            <Link
              href={id == "custom" ? "/" : `/trip/${id}`}
              className="absolute top-5 right-9"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
            <form className=" mt-5 flex  flex-col gap-5  ">
              <div className="max-w-96">
                <Input
                  required
                  label="Enter your name"
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>
              <div className="max-w-96">
                <Select
                  onChange={(e) => {
                    setcountryName(e);
                  }}
                  size="lg"
                  label="Select Country"
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

              <div className="relative flex w-full max-w-[24rem]">
                <Menu placement="bottom-start">
                  <MenuHandler>
                    <Button
                      ripple={false}
                      variant="text"
                      color="blue-gray"
                      className="flex h-10 items-center gap-2 rounded-r-none border border-r-0 border-blue-gray-200 bg-blue-gray-500/10 pl-3"
                    >
                      <img
                        src={flags.svg}
                        alt={name}
                        className="h-4 w-4 rounded-full object-cover"
                      />
                      {countryCallingCode}
                    </Button>
                  </MenuHandler>
                  <MenuList className="max-h-[20rem] max-w-[18rem]">
                    {countries
                      .sort((a, b) => a.name.localeCompare(b.name))
                      .map(({ name, flags, countryCallingCode }, index) => {
                        return (
                          <MenuItem
                            key={name}
                            value={name}
                            className="flex items-center gap-2"
                            onClick={() => {
                              setCountry(index);
                              setcountryCode(countryCallingCode);
                            }}
                          >
                            <img
                              src={flags.svg}
                              alt={name}
                              className="h-5 w-5 rounded-full object-cover"
                            />
                            {name}{" "}
                            <span className="ml-auto">
                              {countryCallingCode}
                            </span>
                          </MenuItem>
                        );
                      })}
                  </MenuList>
                </Menu>
                <Input
                  required
                  type="tel"
                  placeholder="Mobile Number"
                  className="rounded-l-none !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  containerProps={{
                    className: "min-w-0",
                  }}
                  onChange={(e) => setphone(e.target.value)}
                />
              </div>
              <div className="max-w-96">
                <Input
                  label="E-mail"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                color="green"
                variant="gradient"
                onClick={formSubmit}
                disabled={isSubmitting}
              >
                Get now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
