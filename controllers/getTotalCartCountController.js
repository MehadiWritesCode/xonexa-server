import pool from "../config/postgreSQL.js";

export const getTotalCartCountController = async (req, res) => {
  try {
    // const user_id = Number(rawUserId);
    //where user_id=$1`,[user_id]
    // const {rows} = await pool.query(
    //   `SELECT SUM(quantity) AS totalQuantity FROM shopping_cart `
    // );

    const user_id = Number(req.query.user_id);
   
    if (!user_id || isNaN(user_id)) {
      return res.status(400).json({ message: "Invalid or missing user_id" });
    }

    const { rows } = await pool.query(
      `SELECT COALESCE(SUM(quantity), 0) AS totalquantity FROM shopping_cart WHERE user_id = $1`,
      [user_id]
    );
    const count = rows[0].totalquantity || 0;

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
