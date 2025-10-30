import pool from "../config/postgreSQL.js";

export const deleteUserController = async(req,res) =>{
    const {id} = req.params; 
    const userId = Number(id);  
    try{
          const {rows} =   await pool.query(`SELECT * FROM users WHERE user_id=$1`,[userId])
            if(rows.length === 0) return res.status(400).json({message:"User Not found"})

            await pool.query(`DELETE FROM users WHERE user_id=$1`,[userId])
             return res.status(200).json({message:"user deleted successfully"})

        }catch(err){
            console.log("Error fetching when delete user api occur");
            return res.status(500).json({message:"Internal server error when fetching delete user"})
        }
    
}