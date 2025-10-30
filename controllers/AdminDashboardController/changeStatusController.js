import pool from "../../config/postgreSQL.js";

export const changeStatusController = async(req,res) =>{

    try{
        const{order_id} = req.body;
        await pool.query(`UPDATE orders SET status =$1 WHERE order_id=$2`,["completed",Number(order_id)])
        
        return res.status(200).json({
            success:true,
            message:"status updated successfully"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error when updating status"
        })
    }
}