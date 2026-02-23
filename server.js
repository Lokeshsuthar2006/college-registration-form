const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",       // keep empty for XAMPP default
  database: "college_db"
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("MySQL Connected!");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// API route to save form data
app.post("/api/register", (req, res) => {
  const { name, fatherName, email, phone, course, semester, address } = req.body;

  console.log("Received data:", req.body); // 👈 VERY IMPORTANT LOG

  const sql = `
    INSERT INTO students (name, fatherName, email, phone, course, semester, address)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(sql, [name, fatherName, email, phone, course, semester, address], (err, result) => {
    if (err) {
      console.error("Insert error:", err);  // 👈 LOG ERROR
      return res.json({ success: false, message: "Database error" });
    }

    console.log("Insert result:", result); // 👈 CONFIRM INSERT
    res.json({ success: true, message: "Student registered successfully" });
  });
});

// Start server
app.listen(5000, () => {
  console.log("Server running at http://localhost:5000");
});