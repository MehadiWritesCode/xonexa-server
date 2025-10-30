import product from "../config/mongodb.config.js"
export const getAllProductsController = async(req,res)=>{

    try{
       const products = await product.find();
       res.status(200).json({
        success:true,
        length:products.length,
        products
       });

    }catch(err){
        res.status(400).json({
            success:false,
            message:"failed to load all products",
            error:err.message,
        })
    }
}