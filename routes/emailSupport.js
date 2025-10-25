import express from "express"
import nodemailer from "nodemailer"
import dotenv from "dotenv"


dotenv.config()

const router = express.Router()



router.post("/send" , async (req , res ) => {

    const {email , subject , message } = req.body

    try{
        const transporter = nodemailer.createTransport({
            service : "gmail",
            auth : {
                user : process.env.EMAIL_USER,
                pass : process.env.EMAIL_PASS
            }

        })

         const mailOptions = {
            from : email,
            to: process.env.EMAIL_USER,
            subject : subject || "Support Request",

            html : 
            `<p>${message}</p> 
            `
         }

         await transporter.sendMail(mailOptions);
         res.json({message : "Support email successfully sent"})
    }catch(err){
        console.log(err)
       res.status(500).json({ error: 'Failed to send support email.' });


    }




})

export default router