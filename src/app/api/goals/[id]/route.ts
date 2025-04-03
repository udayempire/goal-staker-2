import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Goal } from "@/models/goals";

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { id } = params;

  try {
    // Find the goal by ID
    const goal = await Goal.findById(id);

    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Goal retrieved successfully", goal });
  } catch (error) {
    console.error("Error fetching goal:", error);
    return NextResponse.json({ error: "Error fetching goal" }, { status: 500 });
  }
}
