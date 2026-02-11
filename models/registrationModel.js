import mongoose from "mongoose";


const registrationSchema = new mongoose.Schema({
 
  email: { type: String, unique: true },
  password: String,
  finances : [{type:mongoose.Schema.Types.ObjectId , ref : "finance"}],
  subscriptions : [{ type:mongoose.Schema.Types.ObjectId , ref: "subscription"}],
  transactions : [    
    {type:mongoose.Schema.Types.ObjectId , ref:"transaction"}
  ]
});

const RegistrationModel = mongoose.model("registration", registrationSchema);

export default RegistrationModel;
