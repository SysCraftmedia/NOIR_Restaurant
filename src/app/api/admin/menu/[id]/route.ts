
import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import MenuItemModel from "@/src/model/MenuItemModel";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;

    const menuItem = await MenuItemModel.findById(id).populate(
      "category",
      "name slug"
    );

    if (!menuItem) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, menuItem },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching menu item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch menu item" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const updatedMenuItem = await MenuItemModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedMenuItem) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Menu item updated successfully",
        menuItem: updatedMenuItem,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating menu item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update menu item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const deletedMenuItem = await MenuItemModel.findByIdAndDelete(id);

    if (!deletedMenuItem) {
      return NextResponse.json(
        { success: false, message: "Menu item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Menu item deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting menu item:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete menu item" },
      { status: 500 }
    );
  }
}
