import product from "../config/mongodb.config.js";

export const addProductController = async (req, res) => {
  try {
    const { name, description, category, stock, price, discount, sizes } = req.body;
    const parsedSizes = sizes ? JSON.parse(sizes) : {};

    if (!name || !description || !category || !stock || !price) {
      return res.status(400).json({ message: "All required fields must be filled" });
    }

    // Cloudinary URLs
    const imagePaths = req.files ? req.files.map(file => file.path) : [];

    const id = Date.now();

    const newProduct = await product.create({
      id,
      name,
      description,
      category,
      stock,
      price,
      discount,
      sizes: parsedSizes,
      images: imagePaths,
    });

    return res.status(200).json({
      success: true,
      message: "✅ Product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product!",
      error: error.message,
    });
  }
};

