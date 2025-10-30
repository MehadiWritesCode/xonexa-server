import product from "../config/mongodb.config.js";

export const searchProductController = async (req, res) => {
  try {
    const searchText = req.query.text; // frontend query param

    if (!searchText) {
      return res.status(400).json({ message: "Search text is required" });
    }

    const searchItems = await product.find({
      name: { $regex: searchText, $options: "i" } 
    });

    if (searchItems.length === 0) {
      return res.status(404).json({
        message: "No products found for this name"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products found successfully",
      searchItems: searchItems
    });
  } catch (err) {
    console.error("Error in search API:", err);
    return res.status(500).json({
      message: "Error occurred in search API"
    });
  }
};
