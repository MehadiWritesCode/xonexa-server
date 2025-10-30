import pool from "../config/postgreSQL.js";

export const updateCartItemController = async(req,res) =>{
    try{
        const {cart_id,price,quantity} = req.body;

        await pool.query(`UPDATE shopping_cart SET quantity =$1
            WHERE cart_id=$2`,[quantity,cart_id])
        
            return res.status(200).json({
                message:"Item increment successfull"
            })
    }catch(err){
        console.log("Error fetching data when increment cart item",err);
        return res.status(500).json({
            message:"Internal Server error when increment cart item fetching"
        })
    }
}