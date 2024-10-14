import { Router } from "express";

import userRouter from "./user.route";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Hello, TypeScript with Express! from routes/index.ts");
});

router.use("/users", userRouter);

export default router;
