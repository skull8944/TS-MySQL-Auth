import express, { Request, Response, NextFunction } from "express";
import config from "config";
import bodyParser from "body-parser";
import log from "./utils/log";
import userRoute from "./routes/user.route";

const app = express();
const port = config.get("port");

app.use(bodyParser.json());
app.use(userRoute);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.sendStatus(200);
  return next();
});

app.listen(port, () => {
  log.info(`Sever listen at http://localhost:${port}`);
});