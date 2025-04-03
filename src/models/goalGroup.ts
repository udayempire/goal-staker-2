import mongoose, { Schema, model, models } from "mongoose";

const goalGroupSchema = new Schema({
  goalId: { type: Schema.Types.ObjectId, ref: "Goal", required: true },
  participantCount: { type: Number, default: 1 },
  participants: [{ type: String }], // Array of wallet addresses
  creator: { type: String, required: true }, // Wallet address of creator
});

export const GoalGroup = models.GoalGroup || model("GoalGroup", goalGroupSchema);
