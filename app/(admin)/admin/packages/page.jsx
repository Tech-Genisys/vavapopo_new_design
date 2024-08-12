"use client";
import { PackageCardSkeleton } from "@/app/(home)/components/cardSkeleton";
import PackCard from "@/app/(home)/packs/components/PackCard";
import { db, imageDb } from "@/app/firebase/firebaseinit";
import {
  collection,
  getDocs,
  limit,
  query,
  where,
  getDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "@firebase/firestore";
import { Button } from "@material-tailwind/react";
import { deleteObject, ref } from "firebase/storage";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

const PAGE_LIMIT = 15;

function BookingPage() {
  const [packages, setPackages] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
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

  const deletePackFunc = async (id) => {
    try {
      const docRef = doc(db, "packages", id);
      const packData = (await getDoc(docRef)).data();
      const images = packData.days.flatMap((day) => day.images);
      for (const index in images) {
        const image = images[index];
        const imageRef = ref(imageDb, image.path);
        await deleteObject(imageRef);
      }
      await deleteDoc(docRef);
      setPackages((prev) => prev.filter((item) => item.id != id));
    } catch (error) {
      console.log(error);
    }
  };

  const changeExclusiveStatus = async (id, bool) => {
    try {
      const docRef = doc(db, "packages", id);
      await updateDoc(docRef, { exclusive: bool });
      setPackages((prev) =>
        prev.map((item) => {
          if (item.id == id) {
            item.exclusive = bool;
          }
          return item;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPacks();
  }, []);
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
      <div className="mt-5 rounded-xl flex flex-col gap-5 w-fit">
        {isLoading ? (
          <div className="flex flex-col gap-4">
            <PackageCardSkeleton />
            <PackageCardSkeleton />
            <PackageCardSkeleton />
            <PackageCardSkeleton />
          </div>
        ) : (
          packages.map((item) => (
            <div className="p-3 bg-white rounded-xl" key={item.id}>
              <PackCard
                days={item.totalDays}
                title={item.packageTitle}
                description={item.description}
                price={item.startingPrice}
                images={item.days.flatMap((day) => day.images)}
                state={item.state}
                id={item.id}
              />
              <div className="mt-4 flex gap-3 justify-center flex-wrap md:justify-start">
                <Link href={`/admin/edit-package/${item.id}`}>
                  <Button variant="gradient" color="orange">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="gradient"
                  color="red"
                  onClick={() => deletePackFunc(item.id)}
                >
                  Delete
                </Button>
                <Button
                  variant="gradient"
                  color={item.exclusive ? "blue-gray" : "green"}
                  onClick={() => {
                    if (item.exclusive) changeExclusiveStatus(item.id, false);
                    else changeExclusiveStatus(item.id, true);
                  }}
                >
                  {item.exclusive ? "Remove Exclusive" : "Mark Exclusive"}
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
      <ToastContainer />
    </div>
  );
}

export default BookingPage;
