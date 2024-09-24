import {Router} from "express";

import productRouter from "./product.route";

const router = Router();

router.route('/').get((req, res) => {
    res.send('Hello, TypeScript with Express! from routes/index.ts');
});

router.use('/products', productRouter)

export default router;

