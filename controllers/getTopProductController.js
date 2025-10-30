import product from "../config/mongodb.config.js";
import pool from "../config/postgreSQL.js";

export const getTopProdcutController = async(req,res) =>{

    try{

        const {rows} = await pool.query(`SELECT product_id, COUNT(*) AS total_count
            FROM order_items GROUP BY product_id ORDER BY total_count DESC
            LIMIT 10`)
        
            if(rows.length === 0 ){
                return res.status(400).json({
                    message:"No top products found"
                })
            }

        const topProducts = [];

        for(const item of rows){
            const products = await product.findOne({
                id:item.product_id
            })

            if(products){
                topProducts.push(products.toObject())
            }
        }

        return res.status(200).json({
            success:true,
            message:"Top product loaded successful",
            topProducts:topProducts
        })

    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error when fetching top products"
        })
    }
}