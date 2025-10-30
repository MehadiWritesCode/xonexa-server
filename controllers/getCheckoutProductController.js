import pool from "../config/postgreSQL.js";

export const getCheckoutProductController = async(req,res)=>{
    try{
        const user_id = Number(req.query.user_id);
        const {rows} =  await pool.query(`SELECT * FROM shopping_cart WHERE user_id=$1`,[user_id])
     
     if(rows.length == 0) return res.status(400).json({
        success:false,
        message:"No product found"
     })
     
   const subtotalRow = await pool.query(
      `SELECT SUM(price*quantity) AS subtotal FROM shopping_cart WHERE user_id = $1`,
      [user_id]
    );

    const subtotal = subtotalRow.rows[0].subtotal || 0;
     return res.status(200).json({
        success:true,
        items:rows,
        subtotal:subtotal,
        message:"fetching checkout product loaded successfully"
     })

    }catch(err){
        console.log("Error when checkout products fethcing",err);
        return res.status(500).json({
            message:"Internal Server error when fetching checkout products"
        })
    }
}