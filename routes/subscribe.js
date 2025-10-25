import express from "express"; 
import SubscriptionModel from "../models/subcriptionModel.js";
import RegistrationModel from "../models/registrationModel.js";

const router = express.Router()

router.post("/create" , async (req , res) => {
  try {
    const { userId, planName, amount, profitPercent , duration , status , startDate , endDate } = req.body;

    const subscription = new SubscriptionModel({
      user: userId,
      planName,
      amount,
      profitPercent,
      duration,
      status,
      startDate,
      endDate
    });

    await subscription.save();

    await RegistrationModel.findByIdAndUpdate(userId, {
      $push: { subscriptions: subscription._id },
    });

    res.status(201).json({ message: "User subscribed successfully", subscription });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});



export default router