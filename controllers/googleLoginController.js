import jwt from "jsonwebtoken";
import pool from "../config/postgreSQL.js";
export const googleLoginController = async(req,res)=>{
  
    try{
        const {email} = req.body;

        const {rows} = await pool.query(`SELECT * FROM users WHERE email=$1`,[email]);
        if(rows.length> 0 && rows[0].authprovider === "google"){

    // ✅ Generate JWT token
      const token = jwt.sign(
        { id: rows[0].user_id, email: rows[0].email },
        process.env.JWT_SECRET || "mySecretKey",
        { expiresIn: "7d" } // 7 days token valida
      );

            return res.status(201).json({message: "Login Succesfull",token, role: rows[0].role});
        }

        return res.status(400).json({message:"invalid email or password"})
    } catch(err){
       console.log(err);
        return res.status(500).json({message:"Internal server error when login with google api occurred"});
    }

}