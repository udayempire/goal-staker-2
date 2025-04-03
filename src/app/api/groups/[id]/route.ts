import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { GoalGroup } from "@/models/goalGroup";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    // Find the group by ID
    const group = await GoalGroup.findById(id).populate("goalId");

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Group retrieved successfully", group });
  } catch (error) {
    console.error("Error fetching group:", error);
    return NextResponse.json({ error: "Error fetching group" }, { status: 500 });
  }
}
