import express from "express";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import RegistrationModel from "../models/registrationModel.js";
const router = express.Router();

router.post("/send", async (req, res) => {

  const { email, password } = req.body;

  try {
    const user = await RegistrationModel.findOne({ email }).populate("subscriptions").populate("transactions").populate("finances");


    if (!user) {
      return res.status(400).json({ message: 'user not found' });
    }
    


   const passwordCheck = await bcrypt.compare(password, user.password);

    if (!passwordCheck) {
      return res.status(400).json({ message: 'Incorrect Password' });
    }


    const token = jwt.sign({
      isUser : true , 
      firstName : user.firstName ,
       lastName : user.lastName , 
       email : user.email,
       country : user.country,
       phone : user.phone,
       finances : user.finances,
       subscriptions : user.subscriptions,
       transactions : user.transactions
    }, process.env.JWT_SECRET, {expiresIn: '1d',});

    res.json({ token });

    
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
