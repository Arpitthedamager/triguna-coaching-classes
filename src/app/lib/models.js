import mongoose from "mongoose";
// User Schema
const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    profileImage: { type: String, default: "/default-avatar.jpg" },
    role: { type: String, enum: ["student", "teacher"], required: true },
    class: { type: Number },
    recentlyViewed: [
      {
        material: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "StudyMaterial",
        },
        visitedDate: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

// TestPaper Schema
const TestPaperSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
  downloadLink: { type: String },
  openLink: { type: String },
  class: { type: Number, min: 9, max: 12 }, // Class is a number
});

// Statistics Schema
const StatisticsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  testDate: { type: Date, required: true },
  testPercentage: { type: Number, required: true },
});

// Fee Schema
const FeeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  month: { type: String, required: true },
  year: { type: String, required: true },
  type: { type: String, enum: ["Online", "Offline"], required: true },
  amount: { type: Number, required: true },
});

// Attendance Schema
const AttendanceSchema = new mongoose.Schema({
  class: { type: Number, min: 9, max: 12 }, // Class is a number
  date: { type: Date, required: true },
  attendance: {
    type: Map,
    of: { type: String, enum: ["present", "absent", null] },
  },
});

// Study Material Schema
const StudyMaterialSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
  addedDate: { type: Date, required: true },
  downloadLink: { type: String },
  openLink: { type: String },
});

// Notice Board Schema
const NoticeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  class: { type: Number, min: 9, max: 12 }, // Class is a number
});

// Timetable Schema
const TimetableSchema = new mongoose.Schema({
  class: { type: Number, min: 9, max: 12 }, // Class is a number
  schedule: [
    {
      icon: { type: String },
      name: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});

// Export all models
const User = mongoose.models.User || mongoose.model("User", UserSchema);
const TestPaper =
  mongoose.models.TestPaper || mongoose.model("TestPaper", TestPaperSchema);
const Statistics =
  mongoose.models.Statistics || mongoose.model("Statistics", StatisticsSchema);
const Fee = mongoose.models.Fee || mongoose.model("Fee", FeeSchema);
const Attendance =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
const StudyMaterial =
  mongoose.models.StudyMaterial ||
  mongoose.model("StudyMaterial", StudyMaterialSchema);
const Notice = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
const Timetable =
  mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);

export {
  User,
  TestPaper,
  Statistics,
  Fee,
  Attendance,
  StudyMaterial,
  Notice,
  Timetable,
};
