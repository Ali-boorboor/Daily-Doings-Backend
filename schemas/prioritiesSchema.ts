import mongoose from "mongoose";

const prioritiesSchema = new mongoose.Schema(
  {
    priorityEn: {
      type: String,
      required: true,
    },
    priorityFa: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default prioritiesSchema;
