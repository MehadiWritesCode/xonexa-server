import product from "../config/mongodb.config.js";
import pool from "../config/postgreSQL.js";

export const setCheckoutDeatilsController = async (req, res) => {
  try {
    const { user_id, formData, checkoutItems } = req.body;
    const { email, address, city, zip, cardNumber, expDate, cvv } = formData;

    const subtotal = checkoutItems.reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
    const total = subtotal + 2 + 4;

    await pool.query(
      `INSERT INTO orders (user_id,total,email,address,city,zip,card_number,exp_date,cvv,status)
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10)
        `,
      [
        user_id,
        total,
        email,
        address,
        city,
        zip,
        cardNumber,
        expDate,
        cvv,
        "pending",
      ]
    );

    for (const item of checkoutItems) {
      await pool.query(
        `INSERT INTO order_items (quantity, size, price, product_id, user_id)
        VALUES ($1, $2, $3, $4, $5)`,
        [
          item.quantity,
          item.size,
          item.price * item.quantity,
          item.product_id,
          user_id,
        ]
      );

      await product.updateOne(
        {id:item.product_id},
        {$inc:{[`sizes.${item.size}`]:-item.quantity,stock:-item.quantity}}
      )
    }

    await pool.query(`DELETE FROM shopping_cart WHERE user_id=$1`,[user_id]);
     
    

    return res.status(200).json({
      success: true,
      message: "Checkout Succesfful",
    });
  } catch (err) {
    console.log("hello :",err);
    return res.status(500).json({
      success: false,
      message: "Internal server error when checkout",
    });
  }
};
