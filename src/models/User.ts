import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IUser extends Document {
  // username: string;
//   email: string;
  walletAddress?: string;
  reputation: number;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  // username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
  walletAddress: { type: String,required: true, unique: true},
  reputation: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
