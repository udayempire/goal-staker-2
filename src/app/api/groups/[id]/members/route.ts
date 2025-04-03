// app/api/groups/[id]/members/route.ts
import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/dbConnect';// Make sure this path is correct for your project
import Group from '@/models/Group';
import User from '@/models/User';

// ADD a member to the group
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();
    const { userId } = body;
    
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
      return NextResponse.json(
        { success: false, message: 'User not found' },
        { status: 400 }
      );
    }
    
    // Find group and add member if not already a member
    const group = await Group.findById(id);
    if (!group) {
      return NextResponse.json(
        { success: false, message: 'Group not found' },
        { status: 404 }
      );
    }
    
    if (group.members.includes(userId)) {
      return NextResponse.json(
        { success: false, message: 'User is already a member' },
        { status: 400 }
      );
    }
    
    group.members.push(userId);
    await group.save();
    
    return NextResponse.json({ success: true, data: group });
  } catch (error) {
    console.error("Error adding member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to add member" },
      { status: 500 }
    );
  }
}

// REMOVE a member from the group
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();
    const { id } = params;
    const body = await request.json();
    const { userId } = body;
    
    // Validate IDs
    if (!mongoose.Types.ObjectId.isValid(id) || !mongoose.Types.ObjectId.isValid(userId)) {
      return NextResponse.json(
        { success: false, message: 'Invalid ID format' },
        { status: 400 }
      );
    }
    
    const group = await Group.findById(id);
    if (!group) {
      return NextResponse.json(
        { success: false, message: 'Group not found' },
        { status: 404 }
      );
    }
    
    // Cannot remove owner
    if (group.owner === userId) {
      return NextResponse.json(
        { success: false, message: 'Cannot remove group owner' },
        { status: 400 }
      );
    }
    
    // Check if user is a member
    if (!group.members.includes(userId)) {
      return NextResponse.json(
        { success: false, message: 'User is not a member of this group' },
        { status: 400 }
      );
    }
    
    // Remove user from members array
    group.members = group.members.filter(memberId => memberId !== userId);
    await group.save();
    
    return NextResponse.json({ success: true, data: group });
  } catch (error) {
    console.error("Error removing member:", error);
    return NextResponse.json(
      { success: false, error: "Failed to remove member" },
      { status: 500 }
    );
  }
}