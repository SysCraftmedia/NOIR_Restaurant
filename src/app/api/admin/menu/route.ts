import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import MenuItemModel from "@/src/model/MenuItemModel";

export async function GET() {
  try {
    await dbConnect();

    const menuItems = await MenuItemModel.find()
      .populate("category", "name slug")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        menuItems,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu items",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const newMenuItem = await MenuItemModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Menu item created successfully",
        menuItem: newMenuItem,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating menu item:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create menu item",
      },
      { status: 500 }
    );
  }
}