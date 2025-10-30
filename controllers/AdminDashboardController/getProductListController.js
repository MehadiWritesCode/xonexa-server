import product from "../../config/mongodb.config.js"

export const getProductListController = async(req,res)=>{
    try{
      const productList = await product.find();

      if(productList.length == 0)
        return res.status(400).json({
        success:false,
        message:"No product found"
     })

     return res.status(200).json({
        success:true,
        product:productList,
        message:"all product loaded and added to admin product list"
     })
     
    }catch(err){
        return res.status(500).json({
            success:false,
            message:"Internal server error when fetching get product list"
        })
    }
}