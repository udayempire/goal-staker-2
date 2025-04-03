import mongoose from "mongoose";
const MONGODB_URI = process.env.MONGODB_URI as string;
if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}
export async function dbConnect() {
  if (mongoose.connection.readyState >= 1) return;
  await mongoose.connect(MONGODB_URI);
}

export async function connectToDatabase() {
  if (mongoose.connection.readyState >= 1 && mongoose.connection.db) {
    return mongoose.connection.db;
  }
  await mongoose.connect(MONGODB_URI);
  if (!mongoose.connection.db) {
    throw new Error("Database not available after connection");
  }
  return mongoose.connection.db;
}
