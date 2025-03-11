import express, {Express, Request, Response} from 'express';
import dotenv from 'dotenv';
import { connectDb } from './lib/db';
import authRouter from './routes/auth.route';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || '8000';

app.use(express.json());
app.use("/api/auth",authRouter);


app.get("/",(req: Request,res: Response)=>{
    res.send("Hello World");
})

app.listen(port,()=>{
    connectDb();
    console.log(`Server is running on http://localhost:${port}`);
})