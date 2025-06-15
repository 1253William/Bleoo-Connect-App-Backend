import express from 'express';

import dotenv from 'dotenv';
import rootRouter from "./routes/index.route";
import connectDB from "./config/db";
dotenv.config();

//Database Connection
connectDB()

const app = express();

//Middlewares
app.use(express.json());

//routes
app.use("/api/v1", rootRouter);

app.get('/', (_req, res) => {
    res.send('Server Health Check: OK');
});

const PORT = parseInt(process.env.PORT as string, 10) || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is running at http://0.0.0.0:${PORT}`);
});