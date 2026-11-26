import { NextResponse } from "next/server";
import mongoose from "mongoose";
import dbConnect from "@/src/library/dbConnect";
import ReservationModel from "@/src/model/reservationModel";

export async function POST(request: Request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { fullName, email, phone, date, time, guests, specialRequest } = body ?? {};

    const cleanedFullName = typeof fullName === "string" ? fullName.trim() : "";
    const cleanedEmail = typeof email === "string" ? email.trim() : "";
    const cleanedPhone = typeof phone === "string" ? phone.trim() : "";
    const cleanedTime = typeof time === "string" ? time.trim() : "";
    const cleanedSpecialRequest =
      typeof specialRequest === "string" ? specialRequest.trim() : undefined;

    const parsedGuests =
      typeof guests === "number"
        ? guests
        : Number(String(guests ?? "").match(/\d+/)?.[0]);

    const parsedDate = date ? new Date(date) : null;
    const isValidDate = parsedDate instanceof Date && !Number.isNaN(parsedDate.getTime());

    if (
      !cleanedFullName ||
      !cleanedEmail ||
      !cleanedPhone ||
      !isValidDate ||
      !cleanedTime ||
      !parsedGuests ||
      Number.isNaN(parsedGuests) ||
      parsedGuests < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please provide valid reservation details and guest count",
        },
        { status: 400 }
      );
    }

    const newReservation = await ReservationModel.create({
      fullName: cleanedFullName,
      email: cleanedEmail,
      phone: cleanedPhone,
      date: parsedDate,
      time: cleanedTime,
      guests: Math.round(parsedGuests),
      specialRequest: cleanedSpecialRequest,
      status: "pending",
    });

    return NextResponse.json(
      {
        success: true,
        message: "Reservation request submitted successfully",
        reservation: newReservation,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError || error instanceof mongoose.Error.CastError) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid reservation data provided",
        },
        { status: 400 }
      );
    }

    console.error("Reservation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit reservation",
      },
      { status: 500 }
    );
  }
}