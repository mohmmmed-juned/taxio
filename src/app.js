import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./users/userRoutes.js";

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", userRoutes);

connectDB();

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
