const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  videoUrl: String
});

module.exports = mongoose.model("Course", courseSchema);
