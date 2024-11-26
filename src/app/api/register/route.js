import bcrypt from "bcrypt";
import connectDB from "../../../lib/mongodb";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, password } = req.body;

    try {
      await connectDB();

      const userExists = await User.findOne({ email });
      if (userExists) return res.status(400).json({ message: "User already exists" });

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
