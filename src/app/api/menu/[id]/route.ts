import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import MenuItemModel from "@/src/model/MenuItemModel";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await dbConnect();

    const menuItem = await MenuItemModel.findById(params.id).populate(
      "category",
      "name slug"
    );

    if (!menuItem) {
      return NextResponse.json(
        {
          success: false,
          message: "Menu item not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        menuItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch menu item",
      },
      { status: 500 }
    );
  }
}