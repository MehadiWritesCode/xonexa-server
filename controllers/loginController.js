import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/postgreSQL.js";

export const loginController = async (req, res) => {
  const { email, password } = req.body;

  try {
    const {rows} = await pool.query(`SELECT * FROM users where email = $1 `, [
      email,
    ]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    if (await bcrypt.compare(password, rows[0].password_hash)) {
      // ✅ Generate JWT token
      const token = jwt.sign(
        { id: rows[0].user_id, email: rows[0].email },
        process.env.JWT_SECRET || "mySecretKey",
        { expiresIn: "7d" } // 7 days token valid
      );
      return res.status(200).json({ message: "Login successful", token, role: rows[0].role });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ message: "Internal server error when login api occurred" });
  }
};
