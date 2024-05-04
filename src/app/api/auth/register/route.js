import connectDB from "../../../../config/Db";
import User from "../../../../Models/UserModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { email, password } = await request.json();
    connectDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return NextResponse.error(new Error("Email already registered"), {
        status: 400,
      });
    }

    // Encrypt password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the number of salt rounds

    // Save the user to the database
    await connectDB();
    await User.create({ email, password: hashedPassword });

    return NextResponse.json({ message: "user register" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Internal Server Error"), {
      status: 500,
    });
  }
}
