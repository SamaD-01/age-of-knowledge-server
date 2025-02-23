const express = require("express");
const { signup, getAllUsersTest, login, logout, updateUserName, updateAvatar } = require("../controllers/auth.controller.js");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /api/auth/alluser:
 *   get:
 *     summary: Retrieve a list of users
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get("/alluser", getAllUsersTest);

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "test-user2"
 *               email:
 *                 type: string
 *                 example: "test2@mail.com"
 *               password:
 *                 type: string
 *                 example: "dummypass"
 *     responses:
 *       200:
 *         description: User created successfully
 */
router.post("/signup", signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "test2@mail.com"
 *               password:
 *                 type: string
 *                 example: "dummypass"
 *     responses:
 *       200:
 *         description: User logged in successfully
 */
router.post("/login", login);


router.post("/logout", logout);


router.put("/updateusername", updateUserName);
router.put("/updateavatar", updateAvatar);

module.exports = router;
