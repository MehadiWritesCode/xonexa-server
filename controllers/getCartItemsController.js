import pool from "../config/postgreSQL.js";

export const getCartItemsController =async(req,res) =>{

    try{
        const user_id = Number(req.query.user_id);
        const {rows} = await pool.query(`SELECT * FROM shopping_cart WHERE user_id=$1`,[user_id])
        if(rows.length === 0) 
            return res.status(400).json({
             message:"No items found"
        })

        return res.status(200).json({
            items:rows,
            message:"Cart item loaded successfull"
        })
    }catch(err){
        console.log("Internal server error when get cart items controller called",err);
        return res.status(500).json({
            message:"Internal server error when get cart items occur"
        })
    }
}