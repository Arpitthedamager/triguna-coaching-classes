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
  rollNo: number; // New rollNo field
  subjects: {
    // New subjects field
    physics: boolean;
    math: boolean;
    chemistry: boolean;
  };
  recentlyViewed: {
    material: mongoose.Types.ObjectId;
    visitedDate: Date;
  }[];
}

interface Calendar extends Document {
  className: string; // e.g., "9", "10", "11", "12"
  events: {
    date: string;
    subjects: {
      Physics: { status: "on" | "off" | "test" };
      Chemistry: { status: "on" | "off" | "test" };
      Math: { status: "on" | "off" | "test" };
    };
  }[];
}

interface ITestPaper {
  title: string;
  description: string;
  teacher: Schema.Types.ObjectId;  // Assuming teacher is a reference to the User model
  image: string;
  downloadLink: string;
  openLink: string;
  dateAdded: Date; // Date the test paper was added
}

interface ITestPaperClass extends Document {
  class: number; // Class number (9-12)
  testPapers: ITestPaper[];  // Array of test papers for this class
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


interface IRecentlyView extends Document {
  email: string; // The email of the user who viewed the
  materialId: mongoose.Types.ObjectId; // The ID of the material viewed
  visitedDate: Date; // The date the material was viewed
}

interface IStudyMaterial extends Document {
  classLevel: "9" | "10" | "11" | "12"; // Valid class levels
  title: string;
  description: string;
  teacher: string; // Teacher's ID or name (could be replaced with ObjectId if using a separate Teacher collection)
  image: string;
  addedDate: Date;
  downloadLink: string;
  openLink: string;
}
interface INotice extends Document {
  class: number;
  notices: {
    title: string;
    author: string;
    image?: string;
    link?: string;
  }[];
}

interface ITimetable extends Document {
  class: number;
  schedule: {
    icon?: string;
    name: string;
    time: string;
  }[];
}
export interface ITest extends Document {
  class: string;
  physics: {
    userEmail: string;
    userName: string;
    tests: {
      date: Date;
      marksObtained: number;
      totalMarks: number;
    }[];
  }[];
  chemistry: {
    userEmail: string;
    userName: string;
    tests: {
      date: Date;
      marksObtained: number;
      totalMarks: number;
    }[];
  }[];
  maths: {
    userEmail: string;
    userName: string;
    tests: {
      date: Date;
      marksObtained: number;
      totalMarks: number;
    }[];
  }[];
}

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
    rollNo: { type: Number, required: true }, // New rollNo field
    recentlyViewed: [
      {
        material: { type: Schema.Types.ObjectId, ref: "StudyMaterial" },
        visitedDate: { type: Date, default: Date.now },
      },
    ],
    subjects: {
      physics: { type: Boolean, default: false },
      math: { type: Boolean, default: false },
      chemistry: { type: Boolean, default: false },
    },
  },
  { timestamps: true }
);

const TestPaperSchema = new Schema<ITestPaperClass>({
  class: { type: Number, required: true, min: 9, max: 12 },  // Class number (9 to 12)
  testPapers: [
    {
      title: { type: String, required: true },
      description: { type: String },
      teacher: { type: Schema.Types.ObjectId, ref: "User" },  // Assuming teacher is an ObjectId reference to the User model
      image: { type: String },
      downloadLink: { type: String },
      openLink: { type: String },
      dateAdded: { type: Date, default: Date.now }, // Date the paper was added
    },
  ],
});

// Define the schema for the test data
const TestSchema = new Schema<ITest>({
  class: { type: String, required: true }, // Class name (e.g., "10th Grade")
  physics: [
    {
      userEmail: { type: String, required: true }, // Email of the student
      userName: { type: String, required: true }, // Name of the student
      tests: [
        {
          date: { type: Date, required: true }, // Test date
          marksObtained: { type: Number, required: true }, // Marks obtained
          totalMarks: { type: Number, required: true }, // Total marks
        },
      ],
    },
  ],
  chemistry: [
    {
      userEmail: { type: String, required: true }, // Email of the student
      userName: { type: String, required: true }, // Name of the student
      tests: [
        {
          date: { type: Date, required: true },
          marksObtained: { type: Number, required: true },
          totalMarks: { type: Number, required: true },
        },
      ],
    },
  ],
  maths: [
    {
      userEmail: { type: String, required: true }, // Email of the student
      userName: { type: String, required: true }, // Name of the student
      tests: [
        {
          date: { type: Date, required: true },
          marksObtained: { type: Number, required: true },
          totalMarks: { type: Number, required: true },
        },
      ],
    },
  ],
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
  classLevel: {
    type: String,
    enum: ["9", "10", "11", "12"], // Valid class levels
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  teacher: {
    type: String, // Can be ObjectId if referencing a Teacher collection
    required: true,
  },
  image: {
    type: String,
    default: "https://via.placeholder.com/150", // Default image if not provided
  },
  addedDate: {
    type: Date,
    default: Date.now,
  },
  downloadLink: {
    type: String,
    required: true,
  },
  openLink: {
    type: String,
    required: true,
  },
});

const RecentlyViewSchema = new Schema<IRecentlyView>({
  email: { // Replace userId with email
    type: String, 
    required: true,
  },
  materialId: {
    type: mongoose.Schema.Types.ObjectId, // References the study material
    ref: "StudyMaterial", // The model name for StudyMaterial
    required: true,
  },
  visitedDate: {
    type: Date,
    default: Date.now, // Defaults to the current date if not provided
  },
});


const NoticeSchema = new Schema<INotice>({
  class: { type: Number, required: true, min: 9, max: 12 },
  notices: [
    {
      title: { type: String, required: true },
      author: { type: String, required: true },
      image: { type: String },
      link: { type: String },
    },
  ],
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

const CalendarSchema = new Schema<Calendar>({
  className: { type: String, required: true },
  events: [
    {
      date: { type: String, required: true },
      subjects: {
        Physics: {
          status: { type: String, enum: ["on", "off", "test"], required: true },
        },
        Chemistry: {
          status: { type: String, enum: ["on", "off", "test"], required: true },
        },
        Math: {
          status: { type: String, enum: ["on", "off", "test"], required: true },
        },
      },
    },
  ],
});

// Models
const User: Model<IUser> =
  mongoose.models.User || mongoose.model("User", UserSchema);
const TestPaperClass: Model<ITestPaperClass> =
  mongoose.models.TestPaperClass || mongoose.model("TestPaperClass", TestPaperSchema);
const Fee: Model<IFee> =
  mongoose.models.Fee || mongoose.model("Fee", FeeSchema);
const Attendance: Model<IAttendance> =
  mongoose.models.Attendance || mongoose.model("Attendance", AttendanceSchema);
const StudyMaterial: Model<IStudyMaterial> =
  mongoose.models.StudyMaterial ||
  mongoose.model("StudyMaterial", StudyMaterialSchema);
const Notice: Model<INotice> =
  mongoose.models.Notice || mongoose.model<INotice>("Notice", NoticeSchema);
const Timetable: Model<ITimetable> =
  mongoose.models.Timetable || mongoose.model("Timetable", TimetableSchema);
const CalendarModel: Model<Calendar> =
  mongoose.models.Calendar ||
  mongoose.model<Calendar>("Calendar", CalendarSchema);
const TestModel: Model<ITest> =
  mongoose.models.Test || mongoose.model<ITest>("Test", TestSchema);
  const RecentlyView: Model<IRecentlyView> =
  mongoose.models.RecentlyView || mongoose.model("RecentlyView", RecentlyViewSchema);
export {
  User,
  TestPaperClass,
  Fee,
  Attendance,
  StudyMaterial,
  CalendarModel,
  Notice,
  Timetable,
  TestModel,
  RecentlyView,
};
