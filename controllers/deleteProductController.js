import product from "../config/mongodb.config.js"

export const deleteProductController =async(req,res) =>{
  
    const {id} = req.body;
    
    try{
      const result = await product.findOneAndDelete({id:id})
      if(!result)
        return res.status(400).json({message:"No product find by this id"});

      return res.status(200).json({message:"Product successfully deleted"});

    } catch (error) {
    console.error("Product Delete error:", error);
    res.status(500).json({ message: "Server error while deleting product." });
  }
}