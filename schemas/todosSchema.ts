import mongoose from "mongoose";

const todosSchema = new mongoose.Schema(
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
    folder: {
      type: mongoose.Types.ObjectId,
      ref: "folders",
      required: false,
    },
    labelColor: {
      type: String,
      required: false,
      min: 6,
      default: "badge-primary",
    },
    isListTodo: {
      type: Number,
      enum: [0, 1],
      required: false,
      default: 0,
    },
    description: {
      type: String,
      min: 3,
      max: 200,
      required: false,
    },
    listItems: [
      {
        type: String,
        min: 3,
        max: 18,
        required: false,
      },
    ],
  },
  { timestamps: true }
);

export default todosSchema;
