import {Router} from "express";

const router = Router();

router.route('/').get((req, res) => {
    res.send('Hello, TypeScript with Express! from routes/index.ts');
});

export default router;

