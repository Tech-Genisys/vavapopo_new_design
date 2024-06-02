"use client";
import { db } from "@/app/firebase/firebaseinit";
import {
  collection,
  getDocs,
  limit,
  query,
  startAfter,
  where,
} from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import BookingListCard from "../components/bookingListCard";
import { BookingReqSkeleton } from "@/app/(home)/components/cardSkeleton";

const PAGE_SIZE = 20;
function BookingHistoryPage() {
  const [history, setHistory] = useState([]);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const paginatedHisoryFetch = async (lastDoc = null) => {
    setIsLoading(true);
    let q = query(
      collection(db, "booking"),
      where("status", "==", "confirm"),
      limit(PAGE_SIZE)
    );
    if (lastDoc) {
      q = query(q, startAfter(lastDoc));
    }
    const querySnapshot = await getDocs(q);
    const paginaedHistory = [];
    querySnapshot.forEach((doc) => {
      paginaedHistory.push({ id: doc.id, ...doc.data() });
    });
    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
    setLastDoc(lastVisibleDoc);
    if (history.length) {
      setHistory((prev) => [...prev, ...paginaedHistory]);
    } else {
      setHistory(paginaedHistory);
    }
    setHasMore(paginaedHistory.length === PAGE_SIZE);
    setIsLoading(false);
  };

  useEffect(() => {
    paginatedHisoryFetch(lastDoc);
  }, []);

  return (
    <div className="min-h-screen p-4 xl:ml-72 w-full">
      <p className="text-sm font-medium mb-10">Booking History</p>
      <div className="bg-white rounded-md">
        {isLoading ? (
          <div>
            <BookingReqSkeleton />
            <BookingReqSkeleton />
            <BookingReqSkeleton />
          </div>
        ) : (
          history.map((item) => (
            <BookingListCard
              name={item.name}
              country={item.country}
              phone={item.phone}
              id={item.id}
              email={item.email}
              key={item.id}
              isReq={false}
            />
          ))
        )}
        {hasMore && (
          <div className="p-4">
            <button
              onClick={() => paginatedHisoryFetch(lastDoc)}
              className="py-1 px-4 rounded-md bg-gray-900 text-white font-medium"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookingHistoryPage;
