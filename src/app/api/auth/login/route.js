import connectDB from "../../../../config/Db";
import User from "../../../../Models/UserModel";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request, response) {
  try {
    connectDB();
    const { email } = await request.json();
    console.log(email);

    // Check if user exists
    const user = await User.findOne({ email: email });

    if (!user) {
      return NextResponse.error(new Error("User does not exist."), {
        status: 404,
      });
    }

    return NextResponse.json(
      { message: "User is registered" },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.error(new Error("Internal Server Error"), {
      status: 500,
    });
  }
}
