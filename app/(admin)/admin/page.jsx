"use client";

import { useEffect, useState } from "react";
import BookingListCard from "./components/bookingListCard";
import ContactDetailModal from "./components/contactDetailModal";
import Modal from "./components/modal";
import StatCard from "./components/statCard";
import {
  collection,
  getDocs,
  query,
  where,
  getDoc,
  doc,
} from "@firebase/firestore";
import { auth, db } from "../../firebase/firebaseinit";
import {
  BookingReqSkeleton,
  CountSkeleton,
} from "@/app/(home)/components/cardSkeleton";
import { signOut } from "firebase/auth";

function AdminPage() {
  const [showModal, setShowModal] = useState(false);
  const [bookingRequst, setBookinRequest] = useState([]);
  const [bookingReqIsLoading, setBookinReqIsLoading] = useState(true);
  const [currentRequest, setCurrentRequest] = useState({ phone: "", id: "" });
  const [trigger, setTrigger] = useState(false);
  const [countIsLoading, setCountIsLoading] = useState(true);
  const [countStat, setCountStat] = useState({
    confirm: 0,
    pending: 0,
  });

  const getBookingReq = async () => {
    const q = query(
      collection(db, "booking"),
      where("status", "==", "request")
    );
    const res = await getDocs(q);
    const resList = [];
    for (const item of res.docs) {
      const bookingData = item.data();
      const prefferedPackage = doc(db, "packages", bookingData.package);
      let prefferedPackageData = await getDoc(prefferedPackage);
      if (prefferedPackageData.exists()) {
        prefferedPackageData = prefferedPackageData.data().packageTitle;
      } else {
        prefferedPackageData = "custom";
      }
      resList.push({
        id: item.id,
        prefferedPackage: prefferedPackageData,
        ...bookingData,
      });
    }
    console.log(resList);
    setBookinRequest(resList);
    setBookinReqIsLoading(false);
    setCountStat((prev) => ({ ...prev, pending: res.size }));
  };

  const getCount = async () => {
    const q = query(
      collection(db, "booking"),
      where("status", "==", "confirm")
    );
    const res = await getDocs(q);
    setCountStat((prev) => ({ ...prev, confirm: res.size }));
    setCountIsLoading(false);
  };

  useEffect(() => {
    getBookingReq();
    getCount();
  }, [trigger]);

  const openModal = (phone, bookingId) => {
    setCurrentRequest({ phone: phone, id: bookingId });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentRequest({ phone: "", id: "" });
    setTrigger((prev) => !prev);
  };
  return (
    <div className="min-h-screen overflow-scroll xl:ml-72 p-4 w-full">
      {showModal && (
        <Modal
          children={
            <ContactDetailModal
              request={currentRequest}
              closeModal={closeModal}
            />
          }
          modalIsOpen={showModal}
          closeModal={closeModal}
        />
      )}
      <div className="flex justify-between mb-10">
        <p className="text-sm font-medium">Dashboard</p>
        <button
          className="font-medium py-1 px-4 rounded-md bg-gradient-to-b from-gray-800 to-gray-900 text-white hidden xl:block"
          onClick={() => signOut(auth)}
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center md:block">
        {countIsLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <CountSkeleton />
            <CountSkeleton />
            <CountSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <StatCard image="image" title="pending" count={countStat.pending} />
            <StatCard
              image="image"
              title="confirmed"
              count={countStat.confirm}
            />
            <StatCard
              image="image"
              title="Total"
              count={countStat.pending + countStat.confirm}
            />
          </div>
        )}
      </div>
      <div className="mt-20">
        <p className="text-lg font-medium mb-4">Booking request</p>
        <div className="bg-white rounded-md">
          {bookingReqIsLoading ? (
            <BookingReqSkeleton />
          ) : !bookingRequst.length ? (
            <p className="text-black p-5 text-sm">No booking request</p>
          ) : (
            bookingRequst.map((item) => (
              <BookingListCard
                openModal={openModal}
                name={item.name}
                country={item.country}
                phone={item.phone}
                id={item.id}
                email={item.email}
                key={item.id}
                isReq={true}
                prefferedPackage={item.prefferedPackage}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
