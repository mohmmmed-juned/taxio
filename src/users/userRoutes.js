import express from "express";
import authenticateToken from "../middlewares/authenticateToken.js";
import { send_otp_user, otp_verify_user, personal_info_user } from "./authController.js";
import { vehicle_list } from "./vehicleController.js";
import { promocode_list } from "./promocodeController.js";
import { calculateDistance } from "./distanceController.js";
import { createBooking, myBookingList } from "./bookingController.js";
import uploadMiddleware from "../middlewares/multer.js";

const router = express.Router();
const app = express();

router.post("/send-otp", send_otp_user);
router.post("/otp-verify", otp_verify_user);
router.post(
    "/personal-info",
    authenticateToken,
    uploadMiddleware,
    personal_info_user
);
router.post(
    "/create-booking",
    authenticateToken,
    uploadMiddleware,
    createBooking
);
router.get("/vehicle-list", vehicle_list);
router.get("/promocode-list", promocode_list);
router.get("/my-bookings", myBookingList);
router.get("/cal-distance", calculateDistance);

// Added prefix
const prefix = "/user";
const newRouter = app.use(prefix, router);

export default newRouter;
