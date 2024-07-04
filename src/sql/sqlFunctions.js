import mysql from "mysql";
import config from "../config/config.js";

const pool = mysql.createPool({ ...config, acquireTimeout: 6000000 });

export const createTable = (schema) => {
  return new Promise((resove, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resove(results);
      }
    });
  });
};

export const getUserDetailsFromDatabase = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE id = ?";
    pool.query(query, [userId], (err, results) => {
      if (err) {
        console.error("Error executing query:", err);
        reject(err);
      } else {
        // console.log("Results:", results);
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

export const checkRecordExists = (tableName, columns, values) => {
  return new Promise((resolve, reject) => {
    // Construct the WHERE clause dynamically
    const whereClause = columns.map((column) => `${column} = ?`).join(" AND ");
    const query = `SELECT * FROM ${tableName} WHERE ${whereClause}`;

    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results[0] : null);
      }
    });
  });
};

export const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ${tableName} SET ?`;
    pool.query(query, [record], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const updateRecord = (tableName, record, whereClause, whereValues) => {
  return new Promise((resolve, reject) => {
    const setClause = Object.keys(record).map(key => `${key} = ?`).join(', ');
    const query = `UPDATE ${tableName} SET ${setClause} WHERE ${whereClause}`;
  
    pool.query(query, [...Object.values(record), ...whereValues], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export const getVehicle = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;
  
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : []);
      }
    });
  });
};

export const getPromoCodes = (tableName) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName}`;
  
    pool.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results.length ? results : []);
      }
    });
  });
};
