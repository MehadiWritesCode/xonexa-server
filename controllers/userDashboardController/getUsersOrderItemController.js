import pool from "../../config/postgreSQL.js";

export const getUsersOrderItemController = async (req,res) =>{

    try{
        const user_id = Number(req.params.id)
        const {rows} = await pool.query(`SELECT * FROM orders WHERE user_id=$1`,[user_id]);
        
        if(rows.length == 0) return res.status(400).json({
            message:"Oops ! You dont order anything.."
        })

        return res.status(200).json({
            items:rows
        })

    }catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:"Internal Server Error when fetching users total item"
        })
    }
}