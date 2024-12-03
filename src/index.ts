// Task 1: Setting Up the Express Server
import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
import { taskRoutes } from './modules/task/task.routes';
import { connectDB } from './configs/db.config';

const app = express();
const port = process.env.PORT ?? 3000

app.use(express.json());

connectDB();

app.use('/tasks', taskRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
}); 
