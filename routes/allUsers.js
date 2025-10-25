import express from "express";
import RegistrationModel from "../models/registrationModel.js";
const router = express.Router()

router.get("/users", async ( req , res) => {

    try{
        const users = await RegistrationModel.find({} , "email")
        res.json(users)
    }catch(err){
        console.log(err)
        res.status(500).send("Server error")
    }
} )

export default router