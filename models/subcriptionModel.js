import mongoose from "mongoose";


const subscriptionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "registration", required: true },
  planName: { type: String },
  amount: { type: Number },
  profitPercent: { type: Number},
  duration: { type: Number},
  status: { type: String },
  startDate: { type: Date},
  endDate: { type: Date }
});

const SubscriptionModel = mongoose.model("subscription", subscriptionSchema);

export default SubscriptionModel;
