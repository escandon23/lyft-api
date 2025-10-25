import mongoose from "mongoose";

const financeSchema = new mongoose.Schema(
    {
        user : {type: mongoose.Schema.Types.ObjectId, ref: "registration", required: true },
        balance : {type: Number , default : 0 },
        deposited : {type : Number , default : 0},
        bonus : {type : Number , default : 0},
        profit : {type : Number , default : 0},
        refBonus : {type : Number , default : 0}
    }
)


const FinanceModel = new mongoose.model("finance" , financeSchema)

export default FinanceModel 