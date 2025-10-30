// import multer from "multer";
// import path from "path";
// import product from "../config/mongodb.config.js";

// // --- Multer Storage ---
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/"),
//   filename: (req, file, cb) => {
//     const uniqueName =
//       Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
//     cb(null, uniqueName);
//   },
// });

// // --- Multiple File Upload ---
// export const upload = multer({ storage });

// export const addProductController = async (req, res) => {
//   try {
//     const { name, description, category,stock, price, discount, sizes } = req.body;

//     //  Parse sizes JSON
//     const parsedSizes = sizes ? JSON.parse(sizes) : {};

//     //  Validate fields
//     if (!name || !description || !category || !stock || !price) {
//       return res.status(400).json({ message: "All required fields must be filled" });
//     }

//     //  Handle multiple image upload
//     const imagePaths = req.files ? req.files.map((file) => `/uploads/${file.filename}`) : [];

//     //  Create unique product ID
//     const id = Date.now();

//     //  Save to MongoDB
//     const newProduct = await product.create({
//       id,
//       name,
//       description,
//       category,
//       stock,
//       price,
//       discount,
//       sizes: parsedSizes,
//       images: imagePaths,
//     });

//    return res.status(200).json({
//       success: true,
//       message: "✅ Product added successfully!",
//       product: newProduct,
//     });
//   } catch (error) {
//     console.error("❌ Error adding product:", error);
//    return res.status(500).json({
//       success: false,
//       message: "Failed to add product!",
//       error: error.message,
//     });
//   }
// };


import product from "../config/mongodb.config.js";
//import { upload } from "../config/cloudinary.js"; // Cloudinary Multer

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

