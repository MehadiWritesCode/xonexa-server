import pool from "../config/postgreSQL.js";
import jwt from 'jsonwebtoken'
export const googleSignupController = async (req, res) => {
  try {
    const { name, email, authProvider } = req.body;
    console.log(name, email, authProvider);

    const {rows} = await pool.query(`SELECT * FROM users WHERE email =$1`, [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

   const result = await pool.query(
      `INSERT INTO users (full_name,email,authprovider,role) VALUES($1,$2,$3,$4) RETURNING user_id`,
      [name, email, authProvider,"0"]
    );

    const newUserId = result.rows[0].user_id;
    // Generate JWT token
    const token = jwt.sign(
      {id:newUserId, email, role: 0 },
      process.env.JWT_SECRET || "mySecretKey",
      { expiresIn: "7d" } 
    );
    return res
      .status(201)
    .json({ message: "successfully signed up with google", token, role: "0" });
  } catch (err) {
    console.error("❌ Google Signup Failed. Detailed Server Error:", err);
    console.log("something went wrong when google auth api call for insert");
    res.status(500).json({ message: "Something went wrong" });
  }
};
