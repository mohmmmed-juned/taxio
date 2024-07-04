import jwt from "jsonwebtoken";
import {
    getPromoCodes
} from "../sql/sqlFunctions.js";

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ----- Promocode List -----

export const promocode_list = async (req, res) => {
    try {
        const promocode_list = await getPromoCodes("promocodes");

        return res.status(200).json({
            message: "Promocode list.",
            data: promocode_list,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
