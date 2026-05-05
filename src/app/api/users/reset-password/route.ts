import { connect } from "@/dbConfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import getDataFromToken from "@/helpers/get-data-from-token";
connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { oldPassword, newPassword } = reqBody;

    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    const userId = getDataFromToken(request);

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isMatch = await bcryptjs.compare(oldPassword, user.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "Old password is incorrect" },
        { status: 400 },
      );
    }

    const hashedPassword = await bcryptjs.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    return NextResponse.json({
      message: "Password updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Something went wrong" },
      { status: 500 },
    );
  }
}
