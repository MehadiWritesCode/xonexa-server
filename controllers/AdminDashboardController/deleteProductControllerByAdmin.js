import product from "../../config/mongodb.config.js";

export const deleteProductControllerByAdmin = async (req, res) => {
  try {
    const { id } = req.params; // frontend theke URL e path param hisebe dibe
    console.log(id);
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const products = await product.findById(id);
    if (!products) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.findByIdAndDelete(id);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error while deleting product" });
  }
};
