import express, { Request, Response } from 'express';
import connectToDatabase  from './config/db';
import cors from 'cors'
import UserRouter from './routers/UserRouter'
import  { config } from 'dotenv'
import morgan from 'morgan'
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';

config()
const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  }));

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again after 15 minutes.",
    headers: true,
  });

app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(morgan('short'))
app.use(ExpressMongoSanitize())


app.use('/',UserRouter );
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "API Not found" });
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
