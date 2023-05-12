import { Schema, model } from "mongoose";

const basicSchema = Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
});

export default model("students", basicSchema);
