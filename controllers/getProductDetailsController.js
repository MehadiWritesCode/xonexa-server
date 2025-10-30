import product from "../config/mongodb.config.js";

export const getProductDetailsContainer = async (req, res) => {
  try {
    const { id } = req.params;
    const productId = Number(id);
    if (isNaN(productId)) {
      return res.status(400).json({ message: "Invalid product ID" });
    }

    const productDetails = await product.findOne({ id: productId });

    if (!productDetails)
      return res.status(400).json({
        message: "Product details not found",
      });

    return res.status(200).json({
      success: true,
      message: "Product details successfully loaded",
      productDetails: productDetails,
    });
  } catch (err) {
    console.log("Something went wrong when product details occur", err);
    res.status(500).json({
      success: false,
      message: "Internal server Error when fetching product details api",
    });
  }
};
