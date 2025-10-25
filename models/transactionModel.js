  import mongoose from "mongoose";

  const transactionSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "registration", required: true },
    type: { type: String },
    amount: { type: Number},
    status: { type: String },
    date: { type: Date , default : Date.now}
  });

  const TransactionModel = mongoose.model("transaction" , transactionSchema)

  export default TransactionModel