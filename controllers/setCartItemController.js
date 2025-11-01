import pool from "../config/postgreSQL.js";

export const setCartItemController = async (req, res) => {
  const { user_id, product, selectedSize, stock } = req.body;
  const { id: product_id, images, price, name, discount } = product; // discount req.body theke
  
  const discountedPrice = price * (1 - discount / 100);
   
  console.log(typeof user_id);
  try {
    //set size
    const sizeValue =
      selectedSize && selectedSize !== "N/A" ? selectedSize : null;

    const { rows } = await pool.query(
      `SELECT * FROM shopping_cart 
         WHERE user_id = $1 AND product_id = $2 
         AND (size = $3 OR (size IS NULL AND $3 IS NULL))`,
      [user_id, product_id, sizeValue]
    );

    if (rows.length === 0) {
      if (stock <= 0) {
        return res.status(400).json({
          success: false,
          message: "This product is out of stock!",
        });
      }
      // insert
      await pool.query(
        `INSERT INTO shopping_cart(user_id, product_id, size, image, price, name, discount, quantity,stock) 
         VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,
        [
          user_id,
          product_id,
          sizeValue,
          images[0],
          discountedPrice,
          name,
          discount,
          1,
          stock,
        ]
      );

      return res.status(200).json({
        message: "Item added successfully",
      });
    }

    // existing product → increment quantity
    const newQuantity = rows[0].quantity + 1;

    await pool.query(
      `UPDATE shopping_cart SET quantity = $1 WHERE cart_id = $2`,
      [newQuantity, rows[0].cart_id]
    );

    return res.status(200).json({
      message: "Item quantity updated successfully",
    });
  } catch (err) {
    console.log("Error in setCartItemController:", err);
    return res.status(500).json({
      message: "Internal Server error when adding cart item",
    });
  }
};
