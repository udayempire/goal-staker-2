import mongoose, { Schema, model, models } from "mongoose";

const goalSchema = new Schema({
  goalTitle: { type: String, required: true },
  description: { type: String, required: true },
  rules: { type: String, required: true },
  stakeAmount: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  proofOfLink: { type: String, default: "" },  // New field for proof link
  status: { 
    type: String, 
    enum: ["pending", "submitted", "validated"], 
    default: "pending"  // New field for status
  },
  createdAt: { type: Date, default: Date.now },
  creator: { type: String, required: true }, // Wallet address
});

export const Goal = models.Goal || model("Goal", goalSchema);
