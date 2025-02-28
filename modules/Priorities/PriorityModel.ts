import prioritiesSchema from "#s/prioritiesSchema.ts";
import mongoose from "mongoose";

const PriorityModel = mongoose.model("priorities", prioritiesSchema);

export default PriorityModel;
