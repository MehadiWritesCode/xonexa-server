import pool from "../../config/postgreSQL.js";

export const getBuyedProductListController =async(req,res) =>{

    try{

        const user_id = Number(req.params.id);
        const {rows} = await pool.query(`SELECT * FROM order_items WHERE user_id=$1`,[user_id]);

        if(rows.length == 0) return res.status(400).json({
            success:false,
            message:"Ooops! Your list is empty"
        })

        return res.status(200).json({
            success:true,
            rows:rows
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal server error when fetching buyed product list"
        })
    }
}