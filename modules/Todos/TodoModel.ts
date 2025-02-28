import todosSchema from "#s/todosSchema.ts";
import mongoose from "mongoose";

import "#m/Priorities/PriorityModel.ts";
import "#m/Folders/FolderModel.ts";
import "#m/Statuses/StatusModel.ts";

const TodoModel = mongoose.model("todos", todosSchema);

export default TodoModel;
