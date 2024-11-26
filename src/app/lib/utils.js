import mongoose from "mongoose";

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return; // Already connected
  await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;
