import express from "express";
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import RegistrationModel from "../models/registrationModel.js";
import FinanceModel from "../models/financeModel.js";

const router = express.Router()



router.post('/send', async (req, res) => {
  const { firstName, lastName, email, phone, password, rand , country } = req.body;

  try {

    const existingUser = await RegistrationModel.findOne({ email });  
    if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' }); 
   }


    const hashedPassword = await bcrypt.hash(password , 10)
    const user = new RegistrationModel({ firstName, lastName, email, phone, password:hashedPassword, rand , country });
    await user.save();


    const date = new Date()

 


    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router