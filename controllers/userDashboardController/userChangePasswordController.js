import bcrypt from "bcryptjs";
import pool from "../../config/postgreSQL.js";
export const userChangePasswordController = async (req, res) => {
  try {
    const { currentPassword, newPassword, user_id} = req.body;

    const {rows} = await pool.query(
      `SELECT password_hash FROM users WHERE user_id =$1`,
      [user_id]
    );

    if (rows.length === 0)
      return res.status(404).json({
        success: false,
        message: "User not found",
      });

     const hashedPassword = rows[0].password_hash;
     const isMatch = await bcrypt.compare(currentPassword, hashedPassword)

    if (!isMatch)
      return res.status(400).json({
        success: false,
        message: "Current password is incorrect",
      });

    const newHashedPassword = await bcrypt.hash(newPassword, 10);

    await pool.query(
      `UPDATE users SET password_hash = $1 WHERE user_id = $2`,
      [newHashedPassword, user_id]
    );

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to add product!",
    });
  }
};
