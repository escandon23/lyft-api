import express from "express";
import jwt from "jsonwebtoken"


const router = express.Router()



router.post('/adminLogin', (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
  ) {
    const token = jwt.sign({ isAdmin: true }, process.env.JWT_SECRET, {
      expiresIn: '1h',
         
    }  );
    return res.json({ token });
  }

  res.status(401).json({ message: 'Invalid credentialsss' });
});

export default router