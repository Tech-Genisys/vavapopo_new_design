import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { db } from "@/app/firebase/firebaseinit";
import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export const dynamic = "force-dynamic";

export async function GET(request) {
  try {
    let res = await getDocs(
      query(collection(db, "packages"), where("exclusive", "==", true))
    );
    if (res.empty) {
      return NextResponse.json([]);
    }
    const resList = [];
    res.docs.forEach((item) => {
      const data = item.data();
      resList.push({ ...data, id: item.id });
    });
    return NextResponse.json(resList);
  } catch (error) {
    console.log(error);
    return NextResponse.json([]);
  }
}

export async function POST(request) {
  try {
    const { pathOrTag, type } = await request.json();
    if (type == "path") {
      revalidatePath(pathOrTag);
    } else {
      revalidateTag(pathOrTag);
    }
    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "failed" });
  }
}
