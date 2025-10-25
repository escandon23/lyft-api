import { Router } from "express"
import verifyUser from "../middleware/userAuthentication.js"

const router = Router()

router.get('/send', verifyUser, async (req, res) => {

  try {
    res.json({ userInfo: req.user});
  } catch (err) {

    res.status(500).json({ error: "Failed to load inputs" });
  }
});

export default router
