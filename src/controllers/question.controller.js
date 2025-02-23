const pool = require("../libs/db");

const getAllQuestions = async (req, res) => {
    try {
        const allQuestions = await pool.query("SELECT * FROM questions");
        res.status(200).json(allQuestions.rows);
    } catch (error) {
        console.log("Error in getAllQuestions controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const getQuestionById = async (req, res) => {
    try {
        const { id } = req.params;
        const question = await pool.query("SELECT * FROM questions WHERE id = $1", [id]);
        res.status(200).json(question.rows[0]);
    } catch (error) {
        console.log("Error in getQuestionById controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createQuestion = async (req, res) => {
    try {
        const { text, options, difficulty, correct_answer } = req.body;
        
        const optionsJson = JSON.stringify(options);
        
        const newQuestion = await pool.query(
            "INSERT INTO questions (text, options, difficulty, correct_answer) VALUES ($1, $2::jsonb, $3::difficulty, $4) RETURNING *",
            [text, optionsJson, difficulty, correct_answer]
        );
        
        res.status(201).json(newQuestion.rows[0]);
    } catch (error) {
        console.error("Error in createQuestion:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = { getAllQuestions, getQuestionById, createQuestion };