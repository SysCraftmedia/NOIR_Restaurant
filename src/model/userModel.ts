import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  email: string;
  password?: string;
  Fullname: string;
  phone?: string;
  role: "customer" | "admin" | "staff";
  addresses?: {
    label: string; 
    address: string;
    nearestLandmark?: string;
    phone?: string;
  }[];
    verifyCode?: string,
    verifyCodeExpiry?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;

}

const UserSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },
    Fullname: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
    },
    phone: {
      type: String,
      trim: true,
    },
    role: {
      type: String,
      enum: ["customer", "admin", "staff"],
      default: "customer",
    },
    addresses: [
      {
        label: { type: String, required: true },
        address: { type: String, required: true },
        nearestLandmark: { type: String },
        phone: { type: String },
      },
    ],
     verifyCodeExpiry: {
            type: Date,
            required:false
        },
        verifyCode: {
            type: String,
            required: false,
        },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default UserModel;