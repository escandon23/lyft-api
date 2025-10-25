import { Router } from "express"
import verifyAdmin from "../middleware/adminAuthentication.js"

const router = Router()

router.get('/adminDashboard', verifyAdmin, (req, res) => {
  res.json({ message: 'Welcome, Admin! This is the dashboard.' });
});

export default router
