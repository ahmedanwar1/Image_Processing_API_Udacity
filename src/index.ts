import express from "express";
import routes from "./routes/index";
import errorHandler from "./middlewares/errorHandler";

const app: express.Express = express();
const port: number | string = process.env.PORT || 3000;

app.use(express.json());

app.use("/api", routes);

//error handler middleware
app.use(errorHandler);

app.listen(port, () => console.log(`server is up and running on port ${port}`));

export default app;
