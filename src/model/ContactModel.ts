import mongoose, { Schema, Document, Model } from "mongoose";

export interface IContact extends Document {
  fullName: string;
  email: string;
  phone?: string;
  message: string;
  type: "contact" | "private-dining";
  createdAt: Date;
  updatedAt: Date;
}

const ContactSchema = new Schema<IContact>(
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
      required: false, 
    },
    message: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["contact", "private-dining"],
      default: "contact",
    },
  },
  { timestamps: true }
);

const ContactModel: Model<IContact> =
  mongoose.models.Contact || mongoose.model<IContact>("Contact", ContactSchema);

export default ContactModel;