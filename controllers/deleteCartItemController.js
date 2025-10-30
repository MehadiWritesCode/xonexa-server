import pool from "../config/postgreSQL.js";

export const deleteCartItemController = async(req,res) =>{
    try{
        const cart_id = req.query.cart_id;
        await pool.query(`DELETE FROM shopping_cart WHERE cart_id=$1`,[cart_id]);
        return res.status(200).json({
            message:"Items deleted successfully!"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Inetrnal Server error when delete cart item"
        })
    }
}