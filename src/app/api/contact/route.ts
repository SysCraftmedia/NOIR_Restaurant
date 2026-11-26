import { NextResponse } from "next/server";
import dbConnect from "@/src/library/dbConnect";
import ContactModel from "@/src/model/ContactModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { fullName, email, phone, message, type } = body;

    
    if (!fullName || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          message: "Full name, email and message are required",
        },
        { status: 400 }
      );
    }

    const newContact = await ContactModel.create({
      fullName,
      email,
      phone,
      message,
      type: type || "contact", 
    });

    return NextResponse.json(
      {
        success: true,
        message:
          type === "private-dining"
            ? "Private dining inquiry submitted successfully"
            : "Message sent successfully",
        contact: newContact,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit form",
      },
      { status: 500 }
    );
  }
}