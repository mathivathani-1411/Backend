const express = require("express");
const Enrollment = require("../models/Enrollment");

const router = express.Router();

/* ================= STUDENT: ENROLL ================= */
router.post("/enroll", async (req, res) => {
  try {
    const { studentName, courseId, courseTitle } = req.body;

    const existing = await Enrollment.findOne({ studentName, courseId });
    if (existing) {
      return res.status(400).json({ msg: "Already requested" });
    }

    const enrollment = new Enrollment({
      studentName,
      courseId,
      courseTitle,
      status: "pending",
    });

    await enrollment.save();
    res.json({ msg: "Enrollment request sent" });
  } catch (err) {
    console.error("ENROLL ERROR:", err);
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= STUDENT: GET MY STATUS ================= */
router.get("/status/:studentName", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({
      studentName: req.params.studentName,
    });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= ADMIN: VIEW PENDING REQUESTS ================= */
router.get("/admin/requests", async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ status: "pending" });
    res.json(enrollments);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= ADMIN: APPROVE ================= */
router.post("/admin/approve/:id", async (req, res) => {
  try {
    await Enrollment.findByIdAndUpdate(req.params.id, {
      status: "approved",
    });
    res.json({ msg: "Approved" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
