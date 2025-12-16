const mongoose = require("mongoose");

const enrollmentSchema = new mongoose.Schema({
  studentName: String,
  courseId: mongoose.Schema.Types.ObjectId,
  courseTitle: String,
  status: {
    type: String,
    default: "pending"
  }
});

module.exports = mongoose.model("Enrollment", enrollmentSchema);
