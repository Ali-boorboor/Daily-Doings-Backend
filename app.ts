import todayTodosRouter from "#m/TodayTodos/todayTodosRouter.ts";
import usersRouter from "#m/Users/usersRouter.ts";
import todosRouter from "#m/Todos/todosRouter.ts";
import swaggerConfigs from "#c/swaggerConfigs.ts";
import authRouter from "#m/Auth/authRouter.ts";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import path from "path";

// ^ App.ts file exist to handle routes
const app = express();

swaggerConfigs(app);

app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(express.json());
app.use(helmet());

app.use("/covers", express.static(path.join(__dirname, "public", "covers")));

// * routes
app.use("/", authRouter);
app.use("/user", usersRouter);
app.use("/todo", todosRouter);
app.use("/today-todo", todayTodosRouter);

export default app;
