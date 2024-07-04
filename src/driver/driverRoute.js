import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { send_otp, otp_verify, personal_info } from "./driverRegister.js";
import uploadMiddleware from "../middlewares/multer.js";

const router = express.Router();

router.post("/send-otp", send_otp);
router.post("/otp-verify", otp_verify);
router.post(
  "/personal-info",
  authenticateToken,
  uploadMiddleware,
  personal_info
);

export default router;
