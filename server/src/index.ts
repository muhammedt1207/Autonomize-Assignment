import express, { Request, Response } from 'express';
import connectToDatabase  from './config/db';
import cors from 'cors'
import UserRouter from './routers/UserRouter'
import  { config } from 'dotenv'
import morgan from 'morgan'

config()
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(morgan('short'))

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
  }));
  
app.use('/',UserRouter );
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({ success: false, status: 404, message: "API Not found" });
});


app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
