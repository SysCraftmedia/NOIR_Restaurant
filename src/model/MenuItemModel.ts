import mongoose, { Schema, Document, Model } from "mongoose";

export interface IMenuItem extends Document {
  title: string;
  description: string;
  price: number;
  image: string;
  category: mongoose.Types.ObjectId;
  isAvailable: boolean;
  spiceLevel?: "mild" | "medium" | "hot" | "extra_hot";
  variants?: {
    name: string; 
    price: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Categories",
      required: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    spiceLevel: {
      type: String,
      enum: ["mild", "medium", "hot", "extra_hot"],
    },
    variants: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const MenuItemModel: Model<IMenuItem> =
  mongoose.models.MenuItem ||
  mongoose.model<IMenuItem>("MenuItem", MenuItemSchema);

export default MenuItemModel;