import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/postgreSQL.js';

export const signupController = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        // PostgreSQL uses $1, $2, $3 instead of ?
        const { rows: existingUser } = await pool.query(
            `SELECT email FROM users WHERE email = $1`,
            [email]
        );

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }

        const { rows } = await pool.query(
            `INSERT INTO users (full_name, email, password_hash,role) VALUES ($1, $2, $3,$4) RETURNING user_id`,
            [name, email, hashedPassword,"0"]
        );

        const userId = rows[0].id;

        const token = jwt.sign(
            { id: userId, email, role: 0 },
            process.env.JWT_SECRET || "mySecretKey",
            { expiresIn: "7d" }
        );

        return res.status(201).json({ message: "User created successfully", token, role: "0" });
    } catch (err) {
        console.error("Signup API error:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};
