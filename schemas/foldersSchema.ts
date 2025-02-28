import mongoose from "mongoose";

const foldersSchema = new mongoose.Schema(
  {
    name: {
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
  },
  { timestamps: true }
);

foldersSchema.virtual("todos", {
  ref: "todos",
  localField: "_id",
  foreignField: "folder",
});

export default foldersSchema;
