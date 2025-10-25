import mongoose from "mongoose";


const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phone: Number,
  password: String,
  country: String,
  finances : [{type:mongoose.Schema.Types.ObjectId , ref : "finance"}],
  subscriptions : [{ type:mongoose.Schema.Types.ObjectId , ref: "subscription"}],
  transactions : [    
    {type:mongoose.Schema.Types.ObjectId , ref:"transaction"}
  ]
});

const RegistrationModel = mongoose.model("registration", registrationSchema);

export default RegistrationModel;
