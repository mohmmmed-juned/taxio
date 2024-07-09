import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import vehicleSchema from "../driver/vehicleSchema.js";
import vehicleImagesSchema from "../driver/vehicleImagesSchema.js";
import {
    checkRecordExists,
    createTable,
    insertRecord,
    updateRecord,
} from "../sql/sqlFunctions.js";

const generateAccessToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

export const vehicle_add_update = async (req, res) => {
    const { driver_id, vehicle_type, vehicle_name, vehicle_make, vehicle_model, vehicle_year, vehicle_reg_number, vehicle_color } = req.body;
    
    const vehicle_detail = {
        driver_id,
        vehicle_type,
        vehicle_name,
        vehicle_make,
        vehicle_model,
        vehicle_year,
        vehicle_reg_number,
        vehicle_color,
    };

    try {
        await createTable(vehicleSchema);
        await createTable(vehicleImagesSchema);

        const conditions = [vehicle_reg_number];
        const checkVehicleRegistration = await checkRecordExists("vehicles", ["vehicle_reg_number"], conditions);

        if (!checkVehicleRegistration) {
            const insertedRecord = await insertRecord("vehicles", vehicle_detail);
            const vehicle_id = insertedRecord.insertId;

            if (req.files && req.files.length > 0) {
                const filePaths = req.files.map(file => file.path);
                filePaths.forEach(files => {
                    const vehicleImage = {
                        vehicle_id,
                        files
                    };

                    insertRecord("vehicle_images", vehicleImage);
                });
                // user.images = JSON.stringify(filePaths);
            }

            res
                .status(201)
                .json({ data: { id: insertedRecord.insertId }, message: "Vehicle register successfully" });
        }
        else {
            await updateRecord("vehicles", vehicle_detail, "vehicle_reg_number = ?", [conditions]);
            const vehicle_id = checkVehicleRegistration.id;

            if (req.files && req.files.length > 0) {
                const filePaths = req.files.map(file => file.path);
                filePaths.forEach(files => {
                    const vehicleImage = {
                        vehicle_id,
                        files
                    };

                    insertRecord("vehicle_images", vehicleImage);
                });
                // user.images = JSON.stringify(filePaths);
            }

            res
                .status(201)
                .json({ data: { id: checkVehicleRegistration.id }, message: "Vehicle details updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
