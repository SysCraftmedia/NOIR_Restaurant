import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import CategoriesModel from "@/src/model/CategoriesModel";

export async function GET() {
  try {
    await dbConnect();

    const categories = await CategoriesModel.find().sort({ createdAt: -1 });

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

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const newCategory = await CategoriesModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Category created successfully",
        category: newCategory,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create category",
      },
      { status: 500 }
    );
  }
}