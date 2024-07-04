import mysql from "mysql";
import config from "./config.js";

const connectDB = async () => {

  const pool = mysql.createPool({ ...config, acquireTimeout: 6000000 });

  pool.getConnection((err, connection) => {
    if (err) {
      console.log({ error: err.message });
    }

    console.log("Connected to MySQL database");
    connection.release();
  });
};

export default connectDB;
