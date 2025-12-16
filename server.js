const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

/* ================= MIDDLEWARE ================= */
app.use(cors());
app.use(express.json());

/* ================= DATABASE ================= */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err.message));

/* ================= ROUTES ================= */
// Auth routes (login / register)
app.use("/api", require("./routes/authRoutes"));

// Courses + quiz + certificate
app.use("/api/courses", require("./routes/courseRoutes"));

// Enrollment (request + admin approval)
app.use("/api/enrollments", require("./routes/enrollmentRoutes"));

/* ================= SERVER ================= */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
