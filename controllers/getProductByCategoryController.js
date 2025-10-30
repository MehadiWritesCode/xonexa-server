import product from "../config/mongodb.config.js";

export const getProductsByCategoryController = async (req, res) => {
  try {
    const { category } = req.params;

    if (category.toLowerCase() !== "browse all") {
      const products = await product.find({ category: category });

      if (products.length === 0) {
        return res.status(404).json({
          message: "No products found in this category",
        });
      }

      return res.status(200).json({
        message: "Products for category found",
        products: products,
      });
    } else {
      // Browse All case — সব products আনো
      const allProducts = await product.find();
      return res.status(200).json({
        message: "All products fetched successfully",
        products: allProducts,
      });
    }
  } catch (err) {
    console.log("Error fetching products by category:", err);
    res.status(500).json({
      message: "Internal server error when fetching by category",
    });
  }
};
