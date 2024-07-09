import jwt from "jsonwebtoken";
import {
    getList
} from "../sql/sqlFunctions.js";

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ----- Vehicle List -----

export const vehicle_list = async (req, res) => {
    try {
        const vehicle_list = await getList("vehiclelists");

        return res.status(200).json({
            message: "Vehicle list.",
            data: vehicle_list,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
