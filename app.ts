import todayTodosRouter from "#m/TodayTodos/todayTodosRouter.ts";
import foldersRouter from "#m/Folders/foldersRouter.ts";
import usersRouter from "#m/Users/usersRouter.ts";
import todosRouter from "#m/Todos/todosRouter.ts";
import swaggerConfigs from "#c/swaggerConfigs.ts";
import authRouter from "#m/Auth/authRouter.ts";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import path from "path";
import cors from "cors";

// ^ app.ts file exist to handle routes and some middlewares
const app = express();

// * swagger configs
swaggerConfigs(app);
// ! cors
app.use(cors());

// * global middlewares
app.use(cookieParser(process.env.SECRET_COOKIE));
app.use(express.json());
app.use(helmet());

// * static route to get uploaded covers
app.use("/covers", express.static(path.join(__dirname, "public", "covers")));

// * routes
app.use("/", authRouter);
app.use("/user", usersRouter);
app.use("/todo", todosRouter);
app.use("/folder", foldersRouter);
app.use("/today-todo", todayTodosRouter);

export default app;
