import {
  collection,
  getCountFromServer,
  getDocs,
  limit,
  query,
} from "firebase/firestore";
import PacksClientSide from "./components/PacksClientSide";
import { db } from "@/app/firebase/firebaseinit";

const PAGE_SIZE = 20;

export const revalidate = 86400;

const getPacksTotalCount = async () => {
  try {
    const q = query(collection(db, "packages"));
    const snapshot = await getCountFromServer(q);
    return snapshot.data().count;
  } catch (error) {
    console.log("Error getting document count: ", error);
    return null;
  }
};

const getInitData = async () => {
  try {
    const q = query(collection(db, "packages"), limit(PAGE_SIZE));
    const packs = await getDocs(q);
    const res = [];
    packs.forEach((item) => {
      res.push({ id: item.id, ...item.data() });
    });
    return {
      data: res,
      lastDocId: res[res.length - 1].id,
    };
  } catch (error) {
    console.log("Error fetching package data!");
    console.log(error);
    return null;
  }
};

const Page = async () => {
  const size = await getPacksTotalCount();
  const data = await getInitData();
  return (
    <PacksClientSide
      PAGE_SIZE={PAGE_SIZE}
      initData={data.data}
      totalCount={size}
      initLastDocId={data.lastDocId}
    />
  );
};

export default Page;
