const { generateToken } = require("../libs/utils");
const bcrypt = require("bcryptjs");

const pool = require("../libs/db");


const getAllUsersTest = async (req, res) => {
    try {
        const allUser = await pool.query("SELECT * FROM users");
        res.status(200).json(allUser.rows);
    } catch (error) {
        console.log("Error in getAllUser controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};


const signup = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length > 0) return res.status(400).json({ message: "Email already exists" });

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await pool.query("INSERT INTO users (username, email, password, avatar) VALUES ($1, $2, $3, 'age_of_knowledge_avatar.png') RETURNING *", [username, email, hashedPassword]);

        if (newUser) {
            const token = generateToken(newUser.rows[0].id, res);
            return res.status(201).json({ message: "User created successfully", token, user: newUser.rows[0] });
        } else {
            return res.status(400).json({ message: "Something went wrong" });
        }

    } catch (error) {
        console.log("Error in signup controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (user.rows.length === 0) return res.status(400).json({ message: "Invalid credentials" });

        const isMatch = await bcrypt.compare(password, user.rows[0].password);
        if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

        const token = generateToken(user.rows[0].id, res);
        return res.status(200).json({ message: "Login successful", token, user: user.rows[0] });

    } catch (error) {
        console.log("Error in login controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie("jwt");
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.log("Error in logout controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateUserName = async (req, res) => {
    try {
        const { username } = req.body;
        const userId = req.user;
        const updatedUser = await pool.query("UPDATE users SET username = $1 WHERE id = $2 RETURNING *", [username, userId]);
        return res.status(200).json({ message: "Username updated successfully", user: updatedUser.rows[0] });
    } catch (error) {
        console.log("Error in updateUserName controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const updateAvatar = async (req, res) => {
    try {
        const { avatar, userId } = req.body;
        const updatedUser = await pool.query("UPDATE users SET avatar = $1 WHERE id = $2 RETURNING *", [avatar, userId]);
        return res.status(200).json({ message: "Avatar updated successfully", user: updatedUser.rows[0] });
    } catch (error) {
        console.log("Error in updateAvatar controller", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

module.exports = { signup, login, logout, updateUserName, updateAvatar, getAllUsersTest };