import bookingsSchema from "../users/bookingsSchema.js";
import bcrypt from "bcryptjs";
import {
    createTable,
    insertRecord,
    getListWithCondition,
} from "../sql/sqlFunctions.js";

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ----- Personal Information -----
export const createBooking = async (req, res) => {
    const { user_id, driver_id, vehicle_id, amount, pick_up_address, destination_address, distance, time, status } = req.body;

    console.log("req.files :>> ", req.files);

    try {
        await createTable(bookingsSchema);

        const bookingData = {
            user_id,
            driver_id,
            vehicle_id,
            amount,
            pick_up_address,
            destination_address,
            distance,
            time,
            status
        };

        await insertRecord("bookings", bookingData);

        res.status(201).json({
            // data: { user_id: userAlreadyExists ? userAlreadyExists.id : userId },
            message: "Booking successfully",
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ----- My Booking List -----
export const myBookingList = async (req, res) => {
    const { user_id } = req.body;
    
    console.log("req.files :>> ", req.files);
    
    try {
        const userId = ( user_id );
        const booking_list = await getListWithCondition("bookings", userId);

        return res.status(200).json({
            message: "Booking list.",
            data: booking_list,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
