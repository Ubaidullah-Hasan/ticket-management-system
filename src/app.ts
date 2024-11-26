import express, { Request, Response, Application } from "express";
import cors from "cors";
import routeNotFound from "./app/middlewares/routeNotFound";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";


const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

// all routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Is Running!");
});

//global error handler
app.use(globalErrorHandler);

// route not found
app.use(routeNotFound);

export default app;
