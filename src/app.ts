import express, { Request, Response, Application } from "express";
import cors from "cors";


const app: Application = express();

// parser
app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Server Is Running!");
});

export default app;
