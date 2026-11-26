import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import OrderModel from "@/src/model/OrdersModel";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    let query: any = {};
    if (status) {
      query.status = status;
    }

    const orders = await OrderModel.find(query)
      .populate("User", "name email")
      .sort({ createdAt: -1 });

    return NextResponse.json(
      {
        success: true,
        orders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch orders",
      },
      { status: 500 }
    );
  }
}