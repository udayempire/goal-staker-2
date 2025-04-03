import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/dbConnect";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const walletAddress = searchParams.get("walletAddress");

  if (!walletAddress) {
    return NextResponse.json({ message: "Wallet address is required" }, { status: 400 });
  }

  const db = await connectToDatabase();
  const group = await db.collection("goalGroups").findOne({ participants: walletAddress });

  if (group) {
    return NextResponse.json({ message: "User is part of the group", group });
  } else {
    return NextResponse.json({ message: "User not found in any group" }, { status: 404 });
  }
}
