import product from "../../config/mongodb.config.js";

export const updateProductController = async (req, res) => {
  try {
    const updateData = req.body;
    if (!updateData || !updateData.id) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    const updatedProduct = await product.findByIdAndUpdate(
      updateData.id, // filter by product id
      {
        name: updateData.name,
        price: updateData.price,
        discount: updateData.discount,
        sizes: updateData.sizes,
        stock: updateData.stock,
      },
      { new: true } // updated document return করবে
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal Server error when update product by admin",
    });
  }
};
