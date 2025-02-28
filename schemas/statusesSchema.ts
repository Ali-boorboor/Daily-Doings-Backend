import mongoose from "mongoose";

const statusesSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default statusesSchema;
