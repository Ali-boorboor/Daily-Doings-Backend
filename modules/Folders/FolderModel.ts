import foldersSchema from "#s/foldersSchema.ts";
import mongoose from "mongoose";

const FolderModel = mongoose.model("folders", foldersSchema);

export default FolderModel;
