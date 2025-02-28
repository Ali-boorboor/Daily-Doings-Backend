import statusesSchema from "#s/statusesSchema.ts";
import mongoose from "mongoose";

const StatusModel = mongoose.model("statuses", statusesSchema);

export default StatusModel;
