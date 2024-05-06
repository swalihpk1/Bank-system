import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
// import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const port = process.env.PORT || 5001;

// MongoDB connection
connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use('/api/users', userRoutes);
// app.use('/admin', adminRoutes);

app.listen(port, () => console.log(`Server started on port ${port}`));
