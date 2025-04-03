import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { GoalGroup } from "@/models/goalGroup";

export async function GET() {
  await dbConnect();
  try {
    const groups = await GoalGroup.find().populate("goalId");
    return NextResponse.json({ groups });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching groups" }, { status: 500 });
  }
}
