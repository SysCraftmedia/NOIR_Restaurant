import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import PromoCodeModel from "@/src/model/promocodeModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { code, orderAmount } = body;

    if (!code || orderAmount === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Promo code and order amount are required",
        },
        { status: 400 }
      );
    }

    const promo = await PromoCodeModel.findOne({
      code: code.toUpperCase(),
      isActive: true,
    });

    if (!promo) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid promo code",
        },
        { status: 404 }
      );
    }

  
    if (promo.expiryDate && new Date() > promo.expiryDate) {
      return NextResponse.json(
        {
          success: false,
          message: "Promo code has expired",
        },
        { status: 400 }
      );
    }

    
    if (promo.usageLimit && promo.usedCount >= promo.usageLimit) {
      return NextResponse.json(
        {
          success: false,
          message: "Promo code usage limit reached",
        },
        { status: 400 }
      );
    }

    if (promo.minOrderAmount && orderAmount < promo.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          message: `Minimum order amount should be PKR ${promo.minOrderAmount}`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;

    if (promo.discountType === "percentage") {
      discountAmount = (orderAmount * promo.discountValue) / 100;

      if (promo.maxDiscountAmount && discountAmount > promo.maxDiscountAmount) {
        discountAmount = promo.maxDiscountAmount;
      }
    } else {
      discountAmount = promo.discountValue;
    }

    return NextResponse.json(
      {
        success: true,
        message: "Promo code applied successfully",
        discountAmount,
        promo: {
          code: promo.code,
          discountType: promo.discountType,
          discountValue: promo.discountValue,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Promo validate error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to validate promo code",
      },
      { status: 500 }
    );
  }
}