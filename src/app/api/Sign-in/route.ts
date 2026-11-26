import dbConnect from "@/src/library/dbConnect";
import UserModel from "@/src/model/userModel";
import bcrypt from "bcryptjs"
import { NextResponse } from "next/server";




export async function POST(request:Request) {
    try {
        await dbConnect()
      const {identifier , password } = await request.json()
      if (!identifier || !password) {
      return NextResponse.json(
        { success: false, message: "Email/Username and password are required" },
        { status: 400 }
      );
    }
    const user = await UserModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
    if (!user.password) {
      return NextResponse.json(
        { success: false, message: "Please login with Google" },
        { status: 400 }
      );
    }
    if (!user.isVerified) {
      return NextResponse.json(
        { success: false, message: "Please verify your email first" },
        { status: 403 }
      );
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials" },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Login successful",
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
    
    } catch (error) {
        console.error("Sign-in error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
    }
}