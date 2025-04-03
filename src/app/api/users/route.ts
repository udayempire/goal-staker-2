import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect';
import User from '@/models/User';

// GET all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({});
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}

// CREATE a new user
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { username, walletAddress } = await request.json();
    
    // Validation
    
    // if (!username) {
    //   return NextResponse.json(
    //     { success: false, error: 'Username is required' },
    //     { status: 400 }
    //   );
    // }

    // Create the user
    const user = await User.create({
      // username,
      walletAddress,
      reputation: 0
    });
    
    return NextResponse.json({ success: true, data: user }, { status: 201 });
  } catch (error: any) {
    // Handle duplicate username error
    if (error.code === 11000) {
      return NextResponse.json(
        { success: false, error: 'Username already exists' },
        { status: 400 }
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create user",
        message: error.message || "Unknown error"
      },
      { status: 500 }
    );
  }
} 