import pool from "../../config/postgreSQL.js";

export const getUserSummaryController = async (req, res) => {
  try {
    const user_id = Number(req.params.id);

    const spentResult = await pool.query(
      `SELECT COALESCE(SUM(total), 0) AS total_spent FROM orders WHERE user_id = $1`,
      [user_id]
    );

    const orderResult = await pool.query(
      `SELECT COUNT(*) AS total_orders FROM orders WHERE user_id = $1`,
      [user_id]
    );

    const itemResult = await pool.query(
      `SELECT COALESCE(COUNT(*), 0) AS total_items FROM order_items WHERE user_id = $1`,
      [user_id]
    );

    const lastOrderResult = await pool.query(
      `SELECT TO_CHAR(MAX(created_at), 'YYYY-MM-DD') AS last_order_date
       FROM orders WHERE user_id = $1`,
      [user_id]
    );

    return res.status(200).json({
      success: true,
      info: [
        {
          name: "Total Spent",
          value: `${spentResult.rows[0].total_spent}`,
          color: "text-green-600",
          bgColor: "bg-green-100",
          iconKey: "DollarSign",
        },
        {
          name: "Total Orders",
          value: orderResult.rows[0].total_orders,
          color: "text-blue-600",
          bgColor: "bg-blue-100",
          iconKey: "ShoppingCart",
        },
        {
          name: "Total Items Bought",
          value: itemResult.rows[0].total_items,
          color: "text-purple-600",
          bgColor: "bg-purple-100",
          iconKey: "Package",
        },
        {
          name: "Last Order Date",
          value: lastOrderResult.rows[0].last_order_date || "N/A",
          color: "text-orange-600",
          bgColor: "bg-orange-100",
          iconKey: "Calendar",
        },
      ],
    });
  } catch (err) {
    console.error("❌ Error fetching user summary:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error when fetching user summary",
    });
  }
};
