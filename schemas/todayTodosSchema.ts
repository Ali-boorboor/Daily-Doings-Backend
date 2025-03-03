import mongoose from "mongoose";

const todayTodosSchema = new mongoose.Schema(
  {
    subject: {
      type: String,
      min: 3,
      max: 10,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    priority: {
      type: mongoose.Types.ObjectId,
      ref: "priorities",
      required: true,
    },
    status: {
      type: mongoose.Types.ObjectId,
      ref: "statuses",
      required: false,
      default: "67bc643ca74538ab87c5a923",
    },
    expiresAt: {
      type: Date,
      default: () => new Date(Date.now() + 24 * 60 * 60 * 1000),
      index: { expires: 86400 },
    },
  },
  { timestamps: true }
);

export default todayTodosSchema;
