import { Schema, model } from "mongoose";

const addressSchema = Schema(
  {
    city: {
      type: String,
      trim: true,
      required: true,
      default: "Mumbai",
    },
    state: {
      type: String,
      trim: true,
      required: true,
      default: "Maharashtra",
    },
    pincode: {
      type: String,
      trim: true,
      required: true,
      default: "22",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export default model("addresses", addressSchema);
