import mongoose, { Schema, model, models } from "mongoose";

const goalGroupSchema = new Schema({
  goalId: { type: Schema.Types.ObjectId, ref: "Goal", required: true },
  goalTitle: { type: String, required: true },
  description: { type: String, required: true },
  rules: { type: String, required: true },
  stakeAmount: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  creator: { type: String, required: true }, // Wallet address of creator
  participantCount: { type: Number, default: 1 },
  participants: [{ type: String }],
}, { collection: "goalgroups" });

export const GoalGroup = models.GoalGroup || model("GoalGroup", goalGroupSchema);
