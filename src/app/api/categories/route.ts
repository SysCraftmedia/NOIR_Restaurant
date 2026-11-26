import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import CategoriesModel from "@/src/model/CategoriesModel";

export async function GET() {
  try {
    await dbConnect();

    const categories = await CategoriesModel.find({ isActive: true }).sort({
      createdAt: -1,
    });

    return NextResponse.json(
      {
        success: true,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch categories",
      },
      { status: 500 }
    );
  }
}