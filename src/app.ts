import express, { Request, Response, Application } from "express";
import cors from "cors";
import routeNotFound from "./app/middlewares/routeNotFound";
import router from "./app/routes";


const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

// all routes
app.use("/api", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Server Is Running!");
});

// route not found
app.use(routeNotFound);

export default app;
