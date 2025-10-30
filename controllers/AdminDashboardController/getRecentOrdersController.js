import pool from "../../config/postgreSQL.js";

export const getRecentOrdersController = async(req,res)=>{

    try{
        
        const {rows} = await pool.query(`SELECT * FROM orders WHERE status=$1`,["pending"])
        if(rows.length ==0 ) return res.status(400).json({
            success:false,
            message:"No recent Orders found"
        })

        return res.status(200).json({
            success:true,
            activity:rows,
            message:"Recent orders loaded"
        })
    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error when fetching recent orders"
        })
    }
}