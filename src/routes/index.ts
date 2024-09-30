import { Router } from "express";

import productRouter from "./product.route";
import categoryRouter from "./category.route";
import userRouter from "./user.route";

const router = Router();

router.route("/").get((req, res) => {
  res.send("Hello, TypeScript with Express! from routes/index.ts");
});

router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/users", userRouter);

export default router;
