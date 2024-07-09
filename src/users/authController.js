import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

import userSchema from "../users/usersSchema.js";
import otpsSchema from "../users/otpsSchema.js";
import bcrypt from "bcryptjs";
import {
  checkRecordExists,
  createTable,
  insertRecord,
  updateRecord,
} from "../sql/sqlFunctions.js";

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// ----- Send Otp -----

export const send_otp_user = async (req, res) => {
  const { country_code, phone } = req.body;
  if (!country_code || !phone) {
    res.status(400).json({ error: "Country code & Phone number fields cannot be empty!" });
    return;
  }
  //   const salt = await bcrypt.genSalt(10);
  //   const hashedPassword = await bcrypt.hash(password, salt);
  const otp = {
    id: uuidv4(),
    country_code,
    phone,
    otp: "1234", // Generate OTP
  };
  try {
    await createTable(otpsSchema);
    const conditions = [country_code, phone];
    const checkMobileNo = await checkRecordExists("users", ["country_code", "phone"], conditions);

    if (!checkMobileNo) {
      await insertRecord("otp_verifications", otp);
      res
        .status(201)
        .json({ data: { id: otp.id }, message: "Otp send successfully" });
    }
    else {
      res.status(400).json({ error: "Mobile number is already exist!" });
      return;
    }
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ----- Otp Verify -----

export const otp_verify_user = async (req, res) => {
  const { country_code, phone, otp, id } = req.body;

  if ((!country_code && !phone) || !otp) {
    res
      .status(400)
      .json({ error: "Phone number or OTP fields cannot be empty!" });
    return;
  }

  try {
    await createTable(userSchema);
    const conditions = [id, country_code, phone, otp];
    const existingUser = await checkRecordExists(
      "otp_verifications",
      ["id", "country_code", "phone", "otp"],
      conditions
    );

    var token = "";
    
    if (existingUser) {
      const conditions = [country_code, phone];
      const userAlreadyExists = await checkRecordExists(
        "users",
        ["country_code", "phone"],
        conditions
      );
      if (userAlreadyExists) {
        var token = generateAccessToken(userAlreadyExists.id);
        // res.json(token);
      } else {
        const user = {
          id: uuidv4(),
          country_code,
          phone,
        };

        await insertRecord("users", user);

        var token = generateAccessToken(user.id);
      }

      res.status(201).json({
        data: { user_token: token },
        message: "OTP Verified Successfully",
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ----- Personal Information -----
export const personal_info_user = async (req, res) => {
  const { name, email, gender, country_code, phone } = req.body; // Ensure phone is included in the destructuring

  console.log("req.files :>> ", req.files);

  // Uncomment the validation if needed
  // if (!name || !email || !gender || !phone) { // Check if phone is present
  //   res.status(400).json({ error: "User fields cannot be empty!" });
  //   return;
  // }

  try {
    const conditions = [country_code, phone];
    const userAlreadyExists = await checkRecordExists("users", ["country_code", "phone"], conditions);

    const user_type = 1; //1: User, 2: Driver
    const userId = uuidv4();
    const user = {
      name,
      email,
      gender,
      country_code,
      phone,
      user_type
    };

    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map(file => file.path);
      user.images = JSON.stringify(filePaths); // Convert array to JSON string
    }

    if (userAlreadyExists) {
      await updateRecord("users", user, "phone = ? AND country_code = ?", [phone, country_code]);
    } else {
      user.id = userId;
      await insertRecord("users", user);
    }

    res.status(201).json({
      data: { user_id: userAlreadyExists ? userAlreadyExists.id : userId },
      message: "User information  saved successfully",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
