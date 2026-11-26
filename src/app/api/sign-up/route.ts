import dbConnect from "@/src/library/dbConnect";
import UserModel from "@/src/model/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();

  try {
    const { username, email, password, Fullname } = await request.json();


    if (!username || !email || !password || !Fullname) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return Response.json(
        { success: false, message: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }
    if (!/[A-Z]/.test(password)) {
      return Response.json(
        { success: false, message: "Password must contain at least one uppercase letter" },
        { status: 400 }
      );
    }
    if (!/[\d\W_]/.test(password)) {
      return Response.json(
        { success: false, message: "Password must contain at least one number or symbol" },
        { status: 400 }
      );
    }


    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) {
      return Response.json(
        { success: false, message: "Username already exists" },
        { status: 400 }
      );
    }

   
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return Response.json(
        { success: false, message: "Email already exists" },
        { status: 400 }
      );
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new UserModel({
      username,
      email,
      Fullname,
      password: hashedPassword,
      isVerified: true,         
      role: "customer",
    });

    await newUser.save();

    return Response.json(
      {
        success: true,
        message: "User registered successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user:", error);
    return Response.json(
      { success: false, message: "Error registering user" },
      { status: 500 }
    );
  }
}