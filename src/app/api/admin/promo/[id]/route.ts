
import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import PromoCodeModel from "@/src/model/promocodeModel";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();

    const { id } = await params;
    const body = await request.json();

    const updatedPromo = await PromoCodeModel.findByIdAndUpdate(
      id,
      body,
      { new: true }
    );

    if (!updatedPromo) {
      return NextResponse.json(
        { success: false, message: "Promo code not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Promo code updated successfully",
        promo: updatedPromo,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating promo code:", error);
    return NextResponse.json(
      { success: false, message: "Failed to update promo code" },
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

    const deletedPromo = await PromoCodeModel.findByIdAndDelete(id);

    if (!deletedPromo) {
      return NextResponse.json(
        { success: false, message: "Promo code not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Promo code deleted successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting promo code:", error);
    return NextResponse.json(
      { success: false, message: "Failed to delete promo code" },
      { status: 500 }
    );
  }
}
