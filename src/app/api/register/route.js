import { connectToDatabase } from "../../lib/utils";
import { User } from "../../lib/models";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { email, password, role, name, number } = await req.json();

  if (!email || !password || !name || !number) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }

  await connectToDatabase();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword, role, name, number });

  await newUser.save();
  return new Response(JSON.stringify({ message: "User created successfully" }), { status: 201 });
}
