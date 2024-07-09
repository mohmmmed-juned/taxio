import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { send_otp, otp_verify, personal_info } from "./driverRegister.js";
import { vehicle_add_update } from "./vehicleController.js";
import uploadMiddleware from "../middlewares/multer.js";

const router = express.Router();
const app = express();

router.post("/send-otp", send_otp);
router.post("/otp-verify", otp_verify);
router.post(
  "/personal-info",
  authenticateToken,
  uploadMiddleware,
  personal_info
);
router.post("/vehicle-add-update",uploadMiddleware, vehicle_add_update);

// Added prefix
const prefix = "/driver";
const newRouter = app.use(prefix, router);
export default newRouter;
