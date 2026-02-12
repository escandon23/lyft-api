import express from "express";
import bcrypt from "bcrypt"
import RegistrationModel from "../models/registrationModel.js";

const router = express.Router()



router.post('/send', async (req, res) => {
  const { email,password} = req.body;

  try {

    const existingUser = await RegistrationModel.findOne({ email });  
    if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' }); 
   }


    const hashedPassword = await bcrypt.hash(password , 10)
    const user = new RegistrationModel({ email, password:hashedPassword });
    await user.save();




    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router