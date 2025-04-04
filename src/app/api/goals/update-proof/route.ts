import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Goal } from "@/models/goals";

export async function PATCH(req: NextRequest) {
  await dbConnect();
  const { goalId, proofOfLink } = await req.json();

  if (!goalId || !proofOfLink) {
    return NextResponse.json({ error: "Missing goalId or proofOfLink" }, { status: 400 });
  }

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return NextResponse.json({ error: "Goal not found" }, { status: 404 });
    }

    // Update the proofOfLink and set the status to "submitted"
    goal.proofOfLink = proofOfLink;
    goal.status = "submitted";

    await goal.save();

    return NextResponse.json({ message: "Proof updated and status set to submitted", goal });
  } catch (error: any) {
    console.error("Error updating goal:", error.message);
    return NextResponse.json({ error: error.message || "Error updating goal" }, { status: 500 });
  }
}
