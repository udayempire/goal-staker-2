import mongoose, { Schema, model, models } from "mongoose";

const goalGroupSchema = new Schema({
  goalId: { type: Schema.Types.ObjectId, ref: "Goal", required: true },
  participantCount: { type: Number, default: 1 },
  participants: [{ type: String }],
  creator: { type: String, required: true },
}, { collection: "goalgroups" });

export const GoalGroup = models.GoalGroup || model("GoalGroup", goalGroupSchema);
