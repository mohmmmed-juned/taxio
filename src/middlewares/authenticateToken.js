import jwt from "jsonwebtoken";

import { getUserDetailsFromDatabase } from "../sql/sqlFunctions.js";

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  // console.log("token :>> ", token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("decoded :>> ", decoded);
    req.user = await getUserDetailsFromDatabase(decoded.id);

    if (!req.user) {
      return res.status(404).json({ error: "User not found!" });
    }

    next();
  } catch (err) {
    return res.status(403).json({ error: "Invalid token." });
  }
};

export default authenticateToken;
