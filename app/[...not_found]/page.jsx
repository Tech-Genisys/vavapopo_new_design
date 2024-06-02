import React from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "../(home)/components/navbar";

const Page = () => {
  return (
    <div className="flex w-full h-screen justify-center items-center px-32 ">
      <Navbar />
      <div className="md:grid grid-cols-2 gap-4  flex flex-col-reverse max-w-5xl items-center">
        <div className="">
          <h1 className="md:text-8xl font-bold text-gray-700 mb-3 text-5xl">
            Oops!
          </h1>
          <p className="md:text-4xl  max-w-xl">
            {`We can't seem to find the page you're looking for.`}
          </p>
          <p className="md:text-xl font-semibold text-gray-700 mt-3">
            Erorr code : 404
          </p>
          {/* <p className="mt-3 md:text-lg font-semibold">
            Here are some helpful links instead:
          </p>
          <Link href={"/"} className="md:text-lg font-semibold text-green-700">
            Home
          </Link> */}
        </div>
        <Image
          src={"/404.svg"}
          width={400}
          height={300}
          className="mb-4"
          alt="404"
        />
      </div>
    </div>
  );
};

export default Page;
