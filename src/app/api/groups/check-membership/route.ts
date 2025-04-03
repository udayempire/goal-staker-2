import { NextRequest, NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import { GoalGroup } from "@/models/goalGroup";
import { Goal } from "@/models/goals";
import mongoose from "mongoose";

interface IGoal {
  _id: mongoose.Types.ObjectId;
  goalTitle: string;
  description: string;
  rules: string;
  stakeAmount: string;
  startDate: Date;
  endDate: Date;
  creator: string;
}

interface IGoalGroup {
  _id: mongoose.Types.ObjectId;
  goalId: mongoose.Types.ObjectId;
  participantCount: number;
  participants: string[];
  creator: string;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Get the wallet address from query parameters
    const { searchParams } = new URL(request.url);
    const walletAddress = searchParams.get('walletAddress');

    // Validate wallet address parameter
    if (!walletAddress) {
      return NextResponse.json(
        { error: "Wallet address is required" },
        { status: 400 }
      );
    }

    // Find all goal groups where the wallet address is a participant
    const goalGroups = (await GoalGroup.find({
      participants: walletAddress
    }).lean()) as unknown as IGoalGroup[];

    // If no groups found, return empty array
    if (!goalGroups.length) {
      return NextResponse.json({
        success: true,
        data: {
          goals: [],
          totalGoals: 0
        }
      });
    }

    // Extract all goal IDs
    const goalIds = goalGroups.map(group => group.goalId);

    // Fetch all corresponding goals
    const goals = (await Goal.find({
      _id: { $in: goalIds }
    }).lean()) as unknown as IGoal[];

    // Combine goal and group information
    const enrichedGoals = goals.map(goal => {
      const group = goalGroups.find(g => g.goalId.toString() === goal._id.toString());
      return {
        goalId: goal._id,
        goalTitle: goal.goalTitle,
        description: goal.description,
        rules: goal.rules,
        stakeAmount: goal.stakeAmount,
        startDate: goal.startDate,
        endDate: goal.endDate,
        creator: goal.creator,
        isCreator: goal.creator === walletAddress,
        participantCount: group?.participantCount || 1,
        participants: group?.participants || []
      };
    });

    // Separate goals into created and participated
    const createdGoals = enrichedGoals.filter(goal => goal.creator === walletAddress);
    const participatedGoals = enrichedGoals.filter(goal => goal.creator !== walletAddress);

    return NextResponse.json({
      success: true,
      data: {
        created: {
          goals: createdGoals,
          count: createdGoals.length
        },
        participated: {
          goals: participatedGoals,
          count: participatedGoals.length
        },
        totalGoals: enrichedGoals.length
      }
    });

  } catch (error) {
    console.error("Error checking memberships:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "Failed to check memberships",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}