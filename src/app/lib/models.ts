import mongoose, { Schema, Document, Model } from "mongoose";

// Interfaces for Document Types
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  profileImage?: string;
  role: "student" | "teacher";
  class?: number;
  recentlyViewed: {
    material: mongoose.Types.ObjectId;
    visitedDate: Date;
  }[];
}

interface ITestPaper extends Document {
  title: string;
  description?: string;
  teacher: mongoose.Types.ObjectId;
  image?: string;
  downloadLink?: string;
  openLink?: string;
  class: number;
}

interface IStatistics extends Document {
  user: mongoose.Types.ObjectId;
  testDate: Date;
  testPercentage: number;
}

interface IFee extends Document {
  user: mongoose.Types.ObjectId;
  month: string;
  year: string;
  type: "Online" | "Offline";
  amount: number;
}

interface IAttendance extends Document {
  class: number;
  date: Date;
  attendance: Map<string, "present" | "absent" | null>;
}

interface IStudyMaterial extends Document {
  title: string;
  description?: string;
  teacher: mongoose.Types.ObjectId;
  image?: string;
  addedDate: Date;
  downloadLink?: string;
  openLink?: string;
}

interface INotice extends Document {
  title: string;
  author: string;
  image?: string;
  class: number;
}

interface ITimetable extends Document {
  class: number;
  schedule: {
    icon?: string;
    name: string;
    time: string;
  }[];
}

// Schemas
const UserSchema = new Schema<IUser>(
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
        material: { type: Schema.Types.ObjectId, ref: "StudyMaterial" },
        visitedDate: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

const TestPaperSchema = new Schema<ITestPaper>({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
  downloadLink: { type: String },
  openLink: { type: String },
  class: { type: Number, min: 9, max: 12 },
});

const StatisticsSchema = new Schema<IStatistics>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  testDate: { type: Date, required: true },
  testPercentage: { type: Number, required: true },
});

const FeeSchema = new Schema<IFee>({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  month: { type: String, required: true },
  year: { type: String, required: true },
  type: { type: String, enum: ["Online", "Offline"], required: true },
  amount: { type: Number, required: true },
});

const AttendanceSchema = new Schema<IAttendance>({
  class: { type: Number, min: 9, max: 12 },
  date: { type: Date, required: true },
  attendance: {
    type: Map,
    of: { type: String, enum: ["present", "absent", null] },
  },
});

const StudyMaterialSchema = new Schema<IStudyMaterial>({
  title: { type: String, required: true },
  description: { type: String },
  teacher: { type: Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
  addedDate: { type: Date, required: true },
  downloadLink: { type: String },
  openLink: { type: String },
});

const NoticeSchema = new Schema<INotice>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  class: { type: Number, min: 9, max: 12 },
});

const TimetableSchema = new Schema<ITimetable>({
  class: { type: Number, min: 9, max: 12 },
  schedule: [
    {
      icon: { type: String },
      name: { type: String, required: true },
      time: { type: String, required: true },
    },
  ],
});

// Models
const User: Model<IUser> = mongoose.models.User || mongoose.model("User", UserSchema);
const TestPaper: Model<ITestPaper> = mongoose.models.TestPaper || mongoose.model("TestPaper", TestPaperSchema);
const Statistics: Model<IStatistics> = mongoose.models.Statistics || mongoose.model("Statistics", StatisticsSchema);
const Fee: Model<IFee> = mongoose.models.Fee || mongoose.model("Fee", FeeSchema);
const Attendance: Model<IAttendance> = mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
const StudyMaterial: Model<IStudyMaterial> = mongoose.models.StudyMaterial || mongoose.model("StudyMaterial", StudyMaterialSchema);
const Notice: Model<INotice> = mongoose.models.Notice || mongoose.model("Notice", NoticeSchema);
const Timetable: Model<ITimetable> = mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);

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
