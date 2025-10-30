import pool from "../../config/postgreSQL.js";

export const getAnalyticsDataController = async (req, res) => {
  try {
    const user_id = Number(req.params.id);
    const result = await pool.query(
      `SELECT 
          TO_CHAR(created_at, 'YYYY-MM') AS month,
          COUNT(*) AS orders,
          SUM(total) AS total_spent
       FROM orders
       WHERE user_id = $1
       GROUP BY month
       ORDER BY month`,
      [user_id]
    );

    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error when fetching user analytics data",
    });
  }
};
