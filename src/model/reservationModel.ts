import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReservation extends Document {
  fullName: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  guests: number;
  specialRequest?: string;
  status: "pending" | "confirmed" | "cancelled" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    guests: {
      type: Number,
      required: true,
      min: 1,
    },
    specialRequest: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const ReservationModel: Model<IReservation> =
  mongoose.models.Reservation ||
  mongoose.model<IReservation>("Reservation", ReservationSchema);

export default ReservationModel;