const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

/* ===== STUDENT REGISTER ===== */
router.post("/student/register", async (req, res) => {
  try {
    const { name, email, password } = req.body; // ✅ FIXED

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ msg: "Email already registered" });
    }

    const student = new Student({ name, email, password });
    await student.save();

    return res.status(201).json({ msg: "Registration successful" });
  } catch (error) {
    console.error("REGISTER ERROR 👉", error);
    return res.status(500).json({ msg: "Server error" });
  }
});

/* ===== STUDENT LOGIN ===== */
router.post("/student/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email, password });

    if (!student) {
      return res
        .status(401)
        .json({ msg: "Not registered. Please register first." });
    }

    return res.json({
      msg: "Login successful",
      student: {
        name: student.name,
        email: student.email,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR 👉", error);
    return res.status(500).json({ msg: "Server error" });
  }
});
/* ===== ADMIN LOGIN ===== */
router.post("/admin/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "admin123") {
    return res.json({
      msg: "Admin login successful",
      role: "admin",
    });
  }

  return res.status(401).json({ msg: "Invalid admin credentials" });
});

module.exports = router;
