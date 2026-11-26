import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPromoCode extends Document {
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderAmount?: number;
  maxDiscountAmount?: number; 
  usageLimit?: number;
  usedCount: number;
  isActive: boolean;
  expiryDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const PromoCodeSchema = new Schema<IPromoCode>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 0,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
    },
    maxDiscountAmount: {
      type: Number,
    },
    usageLimit: {
      type: Number,
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    expiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const PromoCodeModel: Model<IPromoCode> =
  mongoose.models.PromoCode ||
  mongoose.model<IPromoCode>("PromoCode", PromoCodeSchema, "promos");

export default PromoCodeModel;