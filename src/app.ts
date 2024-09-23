import express from 'express';
import cors from 'cors';
import router from './routes';

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// routes
app.get('/', (req, res) => {
  res.send('<h1>Hello, Please visit /api/v1 to get started</h1>');
});
app.use('/api/v1', router)

export default app;