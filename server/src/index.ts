import express, { Request, Response } from 'express';
import connectToDatabase  from './config/db';
import cors from 'cors'
import UserRouter from './routers/UserRouter'


const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  }));
app.use('/',UserRouter );

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  await connectToDatabase();
});
