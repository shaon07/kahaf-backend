import express from "express";
import cors from "cors";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import session from "express-session";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(session({
  secret: 'gfg-key',
  resave: false,
  saveUninitialized: true
}));

// routes
app.get("/", (req, res) => {
  res.send("<h1>Hello, Please visit /api/v1 to get started</h1>");
});
app.use("/api/v1", router);

app.use(errorHandler);
export default app;
