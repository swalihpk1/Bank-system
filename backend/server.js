import express from "express"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import connectDB from "./config/db.js";
import cors from 'cors'

const port = process = process.env.PORT || 5000;

//mongoDB connection 
connectDB();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors())
app.use('/users', userRoutes);
app.use('/admin', adminRoutes);


app.listen(port, () => console.log(`server started on port ${port}`))


a


