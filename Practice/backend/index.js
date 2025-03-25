import express from 'express';
import cors from 'cors';
import vacanciesRouter from './routes/vacancies.route.js';
import mongoose from 'mongoose';
import { config } from './config.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/vacancies', vacanciesRouter);

mongoose.connect(config.MONGO_URL)
    .then(() => console.log('Database connected successfully'))
    .catch((error) => {
      console.error('Database connection error:', error);
      process.exit(1);
    });

export default app;