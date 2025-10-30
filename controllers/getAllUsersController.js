import pool from "../config/postgreSQL.js";

export const getAllUsersController = async(req,res) =>{

   try{
        const allUsers = await pool.query(`SELECT * FROM users`)
    if(allUsers.rows.length === 0) return res.status(400).json({
        success:false,
        message:"There are no Users"
    })

    return res.status(200).json({
        success:true,
        message:"All users loaded successful",
        allUsers:allUsers.rows
    })
   }catch(err){

    console.log("error when fetching all users");
    return res.status(500).json({
        message:"Internal server error when fetching all users data"
    })
   }
}