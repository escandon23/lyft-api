import express, { Router } from "express";
import TransactionModel from "../models/transactionModel.js";
import FinanceModel from "../models/financeModel.js";
import RegistrationModel from "../models/registrationModel.js";

const router = express.Router()

router.post("/transaction", async (req, res) => {
  const { userId, type, amount, status, date } = req.body;

  try {
    // Create transaction
    const transaction = new TransactionModel({
      user: userId,
      type,
      amount,
      status,
      date,
    });

    await transaction.save();

    // Add transaction to Registration
    await RegistrationModel.findByIdAndUpdate(userId, {
      $push: { transactions: transaction._id },
    });

    // Get finance record
    let finance = await FinanceModel.findOne({ user: userId });

 

      if (!finance) {
      finance = new FinanceModel({ user: userId });
      } 

    // Update based on transaction type
    if (type === "Deposit") {
      finance.deposited += Number(amount);
      finance.balance += Number(amount);
    } else if (type === "Withdrawal") {
      finance.balance -= Number(amount);
    } else if (type === "Profit") {
      finance.profit += Number(amount);
      finance.balance += Number(amount);
    } else if (type === "Bonus") {
      finance.bonus += Number(amount);
      finance.balance += Number(amount);
    }


    // Save updated finance
    await finance.save();

      await RegistrationModel.findByIdAndUpdate(userId, {
      $push: { finances : finance._id },
    });

    res.status(201).json({ message: "Transaction successful", finance });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});


export default router





