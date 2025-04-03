import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { GoalGroup } from "@/models/goalGroup";

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  await dbConnect();
  const { walletAddress } = await req.json();
  const { id } = params;

  try {
    const group = await GoalGroup.findById(id);
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    if (group.participants.includes(walletAddress)) {
      return NextResponse.json({ message: "Already joined" });
    }

    group.participants.push(walletAddress);
    group.participantCount += 1;
    await group.save();

    return NextResponse.json({ message: "Joined successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error joining group" }, { status: 500 });
  }
}
export async function GET() {
  await dbConnect();
  try {
    const groups = await GoalGroup.find({}).lean();
    return NextResponse.json({ message: "Goal groups retrieved successfully", groups });
  } catch (error) {
    console.error("Error fetching goal groups:", error);
    return NextResponse.json({ error: "Error fetching goal groups" }, { status: 500 });
  }
}
