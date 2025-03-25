import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { connectDb } from './lib/db';
import authRouter from './routes/auth.route';
import cookieParser from'cookie-parser';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || '8000';

app.use(express.json());
app.use(cookieParser())

app.use("/api/auth",authRouter);



app.listen(port,()=>{
    connectDb();``
    console.log(`Server is running on http://localhost:${port}`);
})