import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import PromoCodeModel from "@/src/model/promocodeModel";

export async function GET() {
  try {
    await dbConnect();

    const promos = await PromoCodeModel.find().sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        promos,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching promo codes:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch promo codes",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();

    const newPromo = await PromoCodeModel.create(body);

    return NextResponse.json(
      {
        success: true,
        message: "Promo code created successfully",
        promo: newPromo,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating promo code:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to create promo code",
      },
      { status: 500 }
    );
  }
}