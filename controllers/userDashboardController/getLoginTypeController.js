import pool from "../../config/postgreSQL.js";

export const getLoginTypeController = async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    const {rows} = await pool.query(
      `SELECT authProvider FROM users WHERE user_id =$1`,
      [user_id]
    );
    if (rows.length == 0)
      return res.status(400).json({
        success: false,
        message: "No users found",
      });

    if (rows[0].authProvider === "google") {
      return res.status(200).json({
        success: true,
        isGoogle: true,
        message: "Google login",
      });
    } else {
      return res.status(200).json({
        success: true,
        isGoogle: false,
        message: "Local login",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server error when fetch Users LoginType",
    });
  }
};
