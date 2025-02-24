const pool = require("../libs/db");

const getAllGames = async (req, res) => {
    try {
        const allGames = await pool.query("SELECT * FROM games");
        res.status(200).json(allGames.rows);
    } catch (error) {
        console.log("Error in getAllGames controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const createGame = async (req, res) => {
    try {
        const { host_id } = req.body;

        const tokens_position = Array.from({ length: 4 }, (_, i) => ({
            [`t${i + 1}`]: Math.floor(Math.random() * 32) + 1
        }));

        const newGame = await pool.query(
            "INSERT INTO games (host_id, tokens_position) VALUES ($1, $2) RETURNING *",
            [host_id, JSON.stringify(tokens_position)]
        );

        res.status(201).json(newGame.rows[0]);
    } catch (error) {
        console.error("Error in createGame:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = { getAllGames, createGame };