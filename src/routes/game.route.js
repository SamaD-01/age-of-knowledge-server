const express = require('express');
const router = express.Router();
const { getAllGames, createGame } = require('../controllers/game.controller');

/**
 * @swagger
 * tags:
 *   name: Games
 *   description: Games related endpoints
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Retrieve a list of games
 *     tags: [Games]
 *     responses:
 *       200:
 *         description: A list of games
 */
router.get('/', getAllGames);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Create a new game
 *     tags: [Games]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               host_id:
 *                 type: string
 *                 description: The ID of the host creating the game
 *                 example: "12345"
 *     responses:
 *       201:
 *         description: Game created successfully
 *       400:
 *         description: Bad request
 */
router.post('/', createGame);

module.exports = router;
