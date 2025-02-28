import errorCatcher from "#/middlewares/errorCatcher";
import notFound from "#/middlewares/notFound";
import app from "#/app.ts";
import "#m/Priorities/PriorityModel.ts";
import "#m/Statuses/StatusModel.ts";
import "#c/DB.ts";

// * global middlewares to catch errors and not found routes
app.use(notFound);
app.use(errorCatcher);

app.listen(process.env.PORT, (error) => {
  if (error) console.log(error.message);
  else console.log(`# Listening on http://localhost:${process.env.PORT} ...`);
});
