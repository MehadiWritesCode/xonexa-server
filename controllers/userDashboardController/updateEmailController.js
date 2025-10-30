import pool from "../../config/postgreSQL.js";

export const updateEmailController = async (req, res) => {
  try {
    const { email, user_id } = req.body;
    
    const existing = await pool.query(
      `SELECT * FROM users WHERE email=$1 AND user_id !=$2`,
      [email, user_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    await pool.query(`UPDATE users SET email=$1 WHERE user_id=$2`, [
      email,
      user_id,
    ]);
    return res.status(200).json({
      success: true,
      message: "Email updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: "Internal server error when update email",
      success: false,
    });
  }
};
