import pool from "../../config/postgreSQL.js";

export const getTotalSalesController =async(req,res) =>{

    try{
        const result = await pool.query(`SELECT SUM(total) AS total FROM orders WHERE status =$1`,["completed"]);
        return res.status(200).json({
            success:true,
            totalValue:result.rows[0].total,
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server error when fetching total sales"
        })
    }
}