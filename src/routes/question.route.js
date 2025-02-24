const express = require("express");
const { getAllQuestions, createQuestion, getQuestionById } = require("../controllers/question.controller.js");


const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Questions related endpoints
 */


/**
 * @swagger
 * /api/questions:
 *   get:
 *     summary: Retrieve a list of questions
 *     tags: [Questions]
 *     responses:
 *       200:
 *         description: A list of question
 */
router.get("/", getAllQuestions);

/**
 * @swagger
 * /api/questions:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: QUESTION1
 *               difficulty:
 *                 type: string
 *                 example: LVL2
 *               options:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["OPTION1", "OPTION2", "OPTION3"]
 *               correct_answer:
 *                 type: string
 *                 example: OPTION2
 *     responses:
 *       201:
 *         description: Question created successfully
 */
router.post("/", createQuestion);

/**
 * @swagger
 * /api/questions/{id}:
 *   get:
 *     summary: Retrieve a single question by ID
 *     tags: [Questions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The question ID
 *     responses:
 *       200:
 *         description: A single question
 *       404:
 *         description: Question not found
 */
router.get("/:id", getQuestionById);

module.exports = router;
