import mongoose, { Schema, Document, Model } from "mongoose";

export interface ICategory extends Document {
  name: string;
  slug: string;
  image: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CategoriesSchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const CategoriesModel: Model<ICategory> =
  mongoose.models.Categories ||
  mongoose.model<ICategory>("Categories", CategoriesSchema);

export default CategoriesModel;