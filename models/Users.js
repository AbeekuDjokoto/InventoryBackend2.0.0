import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    shopName: { type: String, required: true },
    salt: { type: String, required: true },
    password: { type: String, required: true },
    products: [],
  },
  { timestamps: true }
);

export default model("Users", userSchema);
