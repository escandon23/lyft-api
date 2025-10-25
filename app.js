import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import mongoose from "mongoose";
import adminLoginRoutes from './routes/adminLogin.js';
import adminDashboardRoutes from './routes/adminDashboard.js'; 
import emailRoutes from './routes/email.js';
import userRegisterRoutes from "./routes/userRegister.js";
import userLoginRoutes from "./routes/userLogin.js";
import userDashboardRoutes from "./routes/userDashboard.js";
import emailSupportRoutes from "./routes/emailSupport.js";
import allUsersRoutes from "./routes/allUsers.js";
import subscribeRoutes from "./routes/subscribe.js";
import transactionRoutes from "./routes/transaction.js"

dotenv.config();

const app = express()

const MONGO_URI = process.env.MONGO_URI

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
  })
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
  });


app.use(cors({ origin : "https://www.vixafx.com" , credentials : true}));

app.use(express.json());

app.use('/api/adminLogin', adminLoginRoutes);
app.use('/api/adminDashboard', adminDashboardRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/support' , emailSupportRoutes)
app.use("/api/userRegister", userRegisterRoutes)
app.use("/api/userLogin" , userLoginRoutes)
app.use('/api/userDashboard', userDashboardRoutes);
app.use('/api/allUsers' , allUsersRoutes);
app.use("/api/subscribe" , subscribeRoutes)
app.use("/api/transactions" , transactionRoutes)


app.listen(5000, () => console.log(`Server running on port 5000`));









