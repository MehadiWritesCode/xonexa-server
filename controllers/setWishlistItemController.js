import pool from "../config/postgreSQL.js";

export const setWishlistItemController =async(req,res) =>{

    try{
      
        const {user_id, productDetails} = req.body;
        const userId = Number(user_id);
        const {name,price}=productDetails;
        const image = productDetails.images[0];
        const product_id = productDetails.id;

      const existing =  await pool.query(`SELECT * FROM wishlist WHERE product_id=$1 AND user_id=$2`,[product_id,userId])
      if(existing.rows.length === 0){
        await pool.query(`INSERT INTO wishlist (user_id,product_id,product_name,price,image)
              VALUES($1,$2,$3,$4,$5)`,
            [userId,product_id,name,price,image])
        
              return res.status(200).json({
                message:"Items added successfully"
              })
      }

      return res.status(400).json({
        message:"This Item already added in your wishlist"
      })
    
    }catch(err){
        console.log(err);
        return res.status(500).json({
            message:"Internal server error when add wishlist item"
        })
    }
}