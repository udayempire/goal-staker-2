import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Goal } from "@/models/goals";
import { GoalGroup } from "@/models/goalGroup";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { goalTitle, description, rules, stakeAmount, startDate, endDate, walletAddress } = await req.json();

  try {
    // Create Goal
    const goal = await Goal.create({ goalTitle, description, rules, stakeAmount, startDate, endDate, creator: walletAddress });

    // Create Goal Group
    await GoalGroup.create({
      goalId: goal._id,
      participants: [walletAddress],
      creator: walletAddress,
    });

    return NextResponse.json({ message: "Goal and group created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error creating goal" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();

  try {
    const goals = await Goal.find({});
    return NextResponse.json({ message: "Goals retrieved successfully", goals });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching goals" }, { status: 500 });
  }
}
