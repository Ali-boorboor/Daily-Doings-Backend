import mongoose from "mongoose";
import todayTodosSchema from "#s/todayTodosSchema.ts";

const TodayTodoModel = mongoose.model("todayTodos", todayTodosSchema);

export default TodayTodoModel;
