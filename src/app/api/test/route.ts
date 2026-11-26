import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect"; // Apna path adjust kar lena
import mongoose from "mongoose";

export async function GET() {
  try {
    // 1. Connection call kiya (jo tumhara function hai)
    await dbConnect();

   
    const isConnected = mongoose.connection.readyState === 1;

    if (isConnected) {
      return NextResponse.json(
        {
          success: true,
          message: "Database connection successful! 🚀",
          dbName: mongoose.connection.name,
          host: mongoose.connection.host,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Database not connected" },
      { status: 500 }
    );
  } catch (error: any) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to connect to database ❌",
        error: error.message || error,
      },
      { status: 500 }
    );
  }
}