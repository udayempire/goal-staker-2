import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import Goal from '@/models/goals';
import User from '@/models/User';
import mongoose from 'mongoose';

// GET all goals or filter by userId
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    let query = {};
    if (userId) {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { success: false, error: 'Invalid user ID format' },
          { status: 400 }
        );
      }
      query = { userId: new mongoose.Types.ObjectId(userId) };
    }

    const goals = await Goal.find(query).populate('userId', 'username');
    return NextResponse.json({ success: true, data: goals });
  } catch (error) {
    console.error("Error fetching goals:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch goals" },
      { status: 500 }
    );
  }
}

// CREATE a new goal
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { title, description, userId, stake, deadline } = await request.json();

    // Validation
    if (!title || !description || !userId || stake === undefined) {
      return NextResponse.json(
        { success: false, error: 'Title, description, userId, and stake are required' },
        { status: 400 }
      );
    }

    // Validate user ID format
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid user ID format' },
        { status: 400 }
      );
    }

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    // Validate stake amount
    if (stake < 0) {
      return NextResponse.json(
        { success: false, error: 'Stake amount cannot be negative' },
        { status: 400 }
      );
    }

    // Create the goal
    const goal = await Goal.create({
      title,
      description,
      userId: new mongoose.Types.ObjectId(userId),
      stake,
      deadline: deadline ? new Date(deadline) : undefined,
      status: 'pending'
    });

    // Populate user information
    await goal.populate('userId', 'username');
    
    return NextResponse.json({ success: true, data: goal }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating goal:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create goal",
        message: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
}
