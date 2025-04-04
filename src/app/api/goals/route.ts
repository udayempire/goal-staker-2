import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { Goal } from "@/models/goals";
import { GoalGroup } from "@/models/goalGroup";

export async function POST(req: NextRequest) {
  await dbConnect();
  const { goalTitle, description, rules, stakeAmount, startDate, endDate, walletAddress, proofOfLink = "", status = "pending" } = await req.json();

  try {
    // Create Goal
    const goal = await Goal.create({ 
      goalTitle, 
      description, 
      rules, 
      stakeAmount, 
      startDate, 
      endDate, 
      proofOfLink,   // New field for proof of link
      status,        // New field for status
      creator: walletAddress 
    });

    console.log("Goal created successfully:", goal);

    // Check if goal was created successfully and has an ID
    if (!goal || !goal._id) {
      throw new Error("Goal creation failed or missing ID");
    }

    // Create Goal Group
    const goalGroup = await GoalGroup.create({
      goalTitle: goal.goalTitle,
      description: goal.description,
      rules: goal.rules,
      stakeAmount: goal.stakeAmount,
      startDate: goal.startDate,
      endDate: goal.endDate,
      goalId: goal._id,
      participants: [walletAddress],
      creator: walletAddress,
    });

    console.log("Goal group created successfully:", goalGroup);

    return NextResponse.json({ message: "Goal and group created successfully" });
  } catch (error: any) {
    console.error("Error creating goal or group:", error.message);
    return NextResponse.json({ error: error.message || "Error creating goal" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await dbConnect();
  try {
    const goals = await Goal.find({});
    return NextResponse.json({ message: "Goals retrieved successfully", goals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json({ error: "Error fetching goals" }, { status: 500 });
  }
}
