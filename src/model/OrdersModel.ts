import mongoose, { Schema, Document, Model } from "mongoose";

export interface IOrderItem {
  menuItem: string;
  quantity: number;
  price: number;
  title?: string;
}

export interface IOrder extends Document {
  TotalAmount: number;
  User?: mongoose.Types.ObjectId;
  fullName: string;
  PhoneNumber: string;
  deliveryAddress?: string;
  paymentMethod: string;
  ExternalPhoneNumber?: string;
  NearestLandmark?: string;
  orderType: "dine-in" | "delivery";
  branch?: string;
  reservationDate?: Date;
  reservationTime?: string;
  status:
    | "pending"
    | "confirmed"
    | "preparing"
    | "out_for_delivery"
    | "delivered"
    | "cancelled";
  deliveryFee?: number;
  tax?: number;
  discount?: number;
  isGuest: boolean;
  MenuItem: IOrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

const orderItemSchema = new Schema<IOrderItem>({
  menuItem: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
  },
});

const OrderSchema = new Schema<IOrder>(
  {
    TotalAmount: {
      type: Number,
      required: true,
    },
    User: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    fullName: {
      type: String,
      required: true,
    },
    PhoneNumber: {
      type: String,
      required: true,
    },
    deliveryAddress: {
      type: String,
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash on Delivery", "card", "easypaisa", "jazzcash"],
    },
    ExternalPhoneNumber: {
      type: String,
    },
    NearestLandmark: {
      type: String,
    },
    orderType: {
      type: String,
      enum: ["dine-in", "delivery"],
      default: "dine-in",
    },
    branch: {
      type: String,
    },
    reservationDate: {
      type: Date,
    },
    reservationTime: {
      type: String,
    },
    status: {
      type: String,
      enum: [
        "pending",
        "confirmed",
        "preparing",
        "out_for_delivery",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    deliveryFee: {
      type: Number,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    isGuest: {
      type: Boolean,
      default: true,
    },
    MenuItem: [orderItemSchema],
  },
  { timestamps: true }
);

const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default OrderModel;