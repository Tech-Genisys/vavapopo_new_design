"use client";
import { PackageCardSkeleton } from "@/app/(home)/components/cardSkeleton";
import PackCard from "@/app/(home)/packs/components/PackCard";
import { db } from "@/app/firebase/firebaseinit";
import { collection, getDocs, limit, query, where } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const PAGE_LIMIT = 15;

function BookingPage() {
  const [packages, setPackages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [trigger, setTrigger] = useState(false);
  const [searchState, setSearchState] = useState("");

  const getPacks = async (title = null) => {
    setIsLoading(true);
    let q = query(collection(db, "packages"), limit(15));
    if (searchState) {
      q = query(
        collection(db, "packages"),
        where("state", "==", searchState),
        limit(PAGE_LIMIT)
      );
    }
    const res = await getDocs(q);
    const resList = [];
    if (title) {
      res.forEach((item) => {
        const packData = item.data();
        if (
          packData.packageTitle.toLowerCase().includes(title.toLowerCase()) ||
          packData.description.toLowerCase().includes(title.toLowerCase())
        ) {
          resList.push(packData);
        }
      });
    } else {
      res.forEach((item) => resList.push({ id: item.id, ...item.data() }));
    }
    setPackages(resList);
    setIsLoading(false);
  };

  const showDeleteToast = (type) => {
    if (type == "success") {
      setTrigger((prev) => !prev);
      toast.success("Successfully deleted the package", {
        type: "success",
        autoClose: 1500,
        closeOnClick: true,
      });
    } else {
      toast.error("Error while deleting the package", {
        type: "error",
        autoClose: 1500,
        closeOnClick: true,
      });
    }
  };
  useEffect(() => {
    getPacks();
  }, [trigger]);
  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full mt-10 xl:mt-0">
      <p className="font-medium text-sm mb-2">Edit package</p>
      <div className="bg-white w-fit flex rounded-full border-black border">
        <form
          className="flex"
          onSubmit={(e) => {
            e.preventDefault();
            if (searchText.trim() == "" && searchState == "") {
              toast.error("Please enter a title", {
                type: "error",
                autoClose: 1500,
                closeOnClick: true,
              });
              return;
            }
            getPacks(searchText);
          }}
        >
          <input
            type="text"
            placeholder="search for a package"
            className="py-1 px-4 rounded-l-full"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="py-1 px-2 text-sm text-white bg-gray-900 hover:scale-105">
            Search
          </button>
        </form>
        <button
          className="py-1 px-4 text-sm text-white bg-gray-800 rounded-r-full hover:scale-105"
          onClick={() => {
            getPacks();
            setSearchText("");
            setSearchState("");
          }}
        >
          Clear
        </button>
      </div>
      <div className="mt-4">
        <p className="font-medium mb-5">Add more filter</p>
        <div>
          <label htmlFor="" className="text-sm">
            State
          </label>
          <br />
          <select
            name=""
            id=""
            className="py-1 px-4 border bg-white rounded-md"
            value={searchState}
            onChange={(e) => setSearchState(e.target.value)}
          >
            <option value="">--all--</option>
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
      </div>
      <p className="mt-20">Top {PAGE_LIMIT} packages</p>
      <div className="mt-5 rounded-xl flex flex-col gap-5 bg-white w-fit">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <PackageCardSkeleton />
            <PackageCardSkeleton />
            <PackageCardSkeleton />
            <PackageCardSkeleton />
          </div>
        ) : (
          packages.map((item) => (
            <PackCard
              days={item.totalDays}
              title={item.packageTitle}
              description={item.description}
              price={item.startingPrice}
              images={item.days.flatMap((day) => day.images)}
              state={item.state}
              update={true}
              id={item.id}
              trigger={showDeleteToast}
              exclusive={item.exclusive}
            />
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default BookingPage;
