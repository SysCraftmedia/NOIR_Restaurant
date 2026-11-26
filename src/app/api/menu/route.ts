import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import MenuItemModel from "@/src/model/MenuItemModel";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("category");

    let query: any = { isAvailable: true };

    if (categoryId) {
      query.category = categoryId;
    }

    const menuItems = await MenuItemModel.find(query)
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