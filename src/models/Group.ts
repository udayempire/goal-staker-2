import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description?: string;
  members: string[]; // Array of user IDs
  owner: Types.ObjectId; // Reference to User
  imageUrl?: string;
  createdAt: Date;
}

const GroupSchema: Schema<IGroup> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: { type: [String], default: [] },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Use ObjectId
  imageUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);
export default Group;
