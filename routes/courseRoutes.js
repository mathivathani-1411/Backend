const express = require("express");
const Course = require("../models/Course");
const Enrollment = require("../models/Enrollment");
const router = express.Router();

/* ================= GET ALL COURSES ================= */
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});
/* ================= ADMIN: GET PENDING REQUESTS ================= */
router.get("/admin/requests", async (req, res) => {
  const enrollments = await Enrollment.find({ status: "pending" });
  res.json(enrollments);
});



/* ================= GET SINGLE COURSE ================= */
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    res.json(course);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

/* ================= COURSE QUIZ (FIXED PATH + 10 QUESTIONS) ================= */
router.get("/quiz/:id", (req, res) => {
  const quiz = [
    {
      question: "What does HTML stand for?",
      options: [
        "Hyper Text Markup Language",
        "High Text Machine Language",
        "Hyperlinks Text Mark Language",
        "None of the above"
      ],
      correct: 0
    },
    {
      question: "Which hook is used for state in React?",
      options: ["useRef", "useState", "useEffect", "useContext"],
      correct: 1
    },
    {
      question: "Which company developed React?",
      options: ["Google", "Microsoft", "Facebook", "Amazon"],
      correct: 2
    },
    {
      question: "Which tag is used to define a hyperlink in HTML?",
      options: ["<link>", "<a>", "<href>", "<url>"],
      correct: 1
    },
    {
      question: "Which keyword is used to declare a variable in JavaScript?",
      options: ["var", "int", "string", "float"],
      correct: 0
    },
    {
      question: "Which method converts JSON to JavaScript object?",
      options: [
        "JSON.parse()",
        "JSON.stringify()",
        "JSON.convert()",
        "JSON.object()"
      ],
      correct: 0
    },
    {
      question: "Which HTTP method is used to fetch data?",
      options: ["POST", "PUT", "GET", "DELETE"],
      correct: 2
    },
    {
      question: "Which React hook runs after render?",
      options: ["useState", "useEffect", "useRef", "useMemo"],
      correct: 1
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["<!-- -->", "#", "//", "**"],
      correct: 2
    },
    {
      question: "Which database is NoSQL?",
      options: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
      correct: 2
    }
  ];

  res.json(quiz);
});

module.exports = router;
