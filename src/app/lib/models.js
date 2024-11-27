import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  name: { type: String, required: true },
  number: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);
