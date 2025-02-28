import todosSchema from "#s/todosSchema.ts";
import mongoose from "mongoose";

const TodoModel = mongoose.model("todos", todosSchema);

export default TodoModel;
