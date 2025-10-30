import pool from "../config/postgreSQL.js";

export const getTotalCartCountController = async (req, res) => {
  try {
    // const rawUserId = req.query.user_id;
    // const user_id = Number(rawUserId);
//where user_id=$1`,[user_id]
    const {rows} = await pool.query(
      `SELECT SUM(quantity) AS totalQuantity FROM shopping_cart `
    );
    const count = rows[0].totalQuantity || 0;

    return res.status(200).json({
      count: count,
      message: "All cart item Get successfull",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      message: "Internal server error when fetching all cart item count",
    });
  }
};
