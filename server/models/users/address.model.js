import { Schema, model } from "mongoose";

const addressSchema = Schema(
  {
    city: {
      type: String,
      trim: true,
      required: true,
    },
    state: {
      type: String,
      trim: true,
      required: true,
    },
    pincode: {
      type: String,
      trim: true,
      required: true,
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
