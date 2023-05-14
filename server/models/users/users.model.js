import { Schema, model } from "mongoose";

const usersSchema = Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
      minLength: 4,
      maxLength: 30,
    },
    username: {
      type: String,
      require: true,
      trim: true,
      lowercase: true,
      unique: true,
      minLength: 4,
      maxLength: 20,
    },
    email: {
      type: String,
      require: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
      trim: true,
    },
    role: {
      type: String,
      require: true,
      lowercase: true,
      trim: true,
      default: "user",
    },
    block: {
      type: Boolean,
      default: false,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default model("users", usersSchema);
