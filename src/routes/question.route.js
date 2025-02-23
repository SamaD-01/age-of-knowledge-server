const express = require("express");
const { getAllQuestions, createQuestion, getQuestionById } = require("../controllers/question.controller.js");


const router = express.Router();

router.get("/", getAllQuestions);
router.post("/", createQuestion);
router.get("/:id", getQuestionById);

module.exports = router;
