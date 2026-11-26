import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/src/library/dbConnect";
import OrderModel from "@/src/model/OrdersModel";
import { authOptions } from "../auth/[...nextauth]/option";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const session: any = await getServerSession(authOptions);

    const body = await request.json();
    const {
      fullName,
      PhoneNumber,
      orderType,
      branch,
      deliveryAddress,
      ExternalPhoneNumber,
      NearestLandmark,
      reservationDate,
      reservationTime,
      paymentMethod,
      MenuItem,
      TotalAmount,
      deliveryFee = 0,
      tax = 0,
      discount = 0,
    } = body;

    if (
      !fullName ||
      !PhoneNumber ||
      !paymentMethod ||
      !MenuItem ||
      MenuItem.length === 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Required fields are missing",
        },
        { status: 400 }
      );
    }

    const newOrder = await OrderModel.create({
      fullName,
      PhoneNumber,
      orderType,
      branch,
      deliveryAddress,
      ExternalPhoneNumber,
      NearestLandmark,
      reservationDate,
      reservationTime,
      paymentMethod,
      MenuItem,
      TotalAmount,
      deliveryFee,
      tax,
      discount,
      status: "pending",
      isGuest: !session,
      User: session?.user?._id || session?.user?.id || null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Order placed successfully",
        order: newOrder,
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Order error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to place order",
      },
      { status: 500 }
    );
  }
}