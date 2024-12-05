import mongoose from "mongoose";

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  name: { type: String, required: true },
  number: { type: String, required: true },
});

export const User = mongoose.models.User || mongoose.model("User", userSchema);

// Calendar Event Schema
const calendarEventSchema = new mongoose.Schema({
  classLevel: { type: Number, required: true }, // Class 9, 10, 11, 12
  dates: [
    {
      date: { type: String, required: true }, // YYYY-MM-DD format
      subjects: {
        type: Map,
        of: { type: String, enum: ["on", "off", "test"], required: true }, // Subject statuses
      },
    },
  ],
});

export const CalendarEvent = mongoose.models.CalendarEvent || mongoose.model("CalendarEvent", calendarEventSchema);
