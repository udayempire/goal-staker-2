// app/api/groups/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/dbConnect'; // Make sure this path is correct for your project
import Group from '@/models/Group';
import User from '@/models/User';
import mongoose from 'mongoose';


// GET all groups
export async function GET() {
  try {
    await dbConnect();
    const groups = await Group.find({});
    return NextResponse.json({ success: true, data: groups });
  } catch (error) {
    console.error("Error fetching groups:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch groups" },
      { status: 500 }
    );
  }
}

// CREATE a new group
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    const { name, description, owner, imageUrl } = await request.json();
    
    // Validation
    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Group name is required' },
        { status: 400 }
      );
    }
    
    if (!owner) {
      return NextResponse.json(
        { success: false, error: 'Owner ID is required' },
        { status: 400 }
      );
    }

    // Validate owner ID format
    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return NextResponse.json(
        { success: false, error: 'Invalid owner ID format' },
        { status: 400 }
      );
    }

    // Check if owner exists in the database
    const userExists = await User.findById(owner);
    if (!userExists) {
      return NextResponse.json(
        { success: false, error: 'Owner user not found' },
        { status: 404 }
      );
    }

    // Create the group
    const group = await Group.create({
      name,
      description,
      owner: new mongoose.Types.ObjectId(owner),
      members: [owner], // Add owner as first member
      imageUrl
    });
    
    return NextResponse.json({ success: true, data: group }, { status: 201 });
  } catch (error: any) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create group", 
        message: error.message || "Unknown error" 
      },
      { status: 500 }
    );
  }
}