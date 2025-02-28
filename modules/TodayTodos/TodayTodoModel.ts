import todayTodosSchema from "#s/todayTodosSchema.ts";
import mongoose from "mongoose";

const TodayTodoModel = mongoose.model("todayTodos", todayTodosSchema);

export default TodayTodoModel;
