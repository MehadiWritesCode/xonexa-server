import product from "../config/mongodb.config.js"

export const getNewestProductsController = async (req,res) =>{

    try{

        const newestProduct = await product.find().sort({ dateAdded: -1 }).limit(8);
        if(newestProduct.length === 0) return res.status(400).json({
            message:"No product Found"
        })

        return res.status(200).json({
            success:true,
            message:"newest Product loadded successfull",
            newestProduct:newestProduct
        })
    
    }catch(err){
        return res.status(500).json({
            message:"Internal server error when fetching newest product"
        })
    }

}