import mongoose, { Document, Model, Schema, Types } from 'mongoose';

export interface IGroup extends Document {
  name: string;
  description?: string;
  members: Types.ObjectId[]; // Array of user ObjectIDs
  owner: Types.ObjectId; // Reference to User
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GroupSchema: Schema<IGroup> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // Reference to User model
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  imageUrl: { type: String },
}, {
  timestamps: true, // Automatically add createdAt and updatedAt fields
});

const Group: Model<IGroup> = mongoose.models.Group || mongoose.model<IGroup>('Group', GroupSchema);
export default Group;
