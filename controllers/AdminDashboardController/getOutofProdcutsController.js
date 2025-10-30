import product from "../../config/mongodb.config.js";

export const getOutofProductsController = async (req, res) => {
  try {
    const products = await product.find();

    if (products.length == 0)
      return res.status(400).json({
        success: false,
        message: "No products found",
      });

    const outOfStockProducts = products
      .map((prod) => {
        const zeroSizes = Object.fromEntries(
          Object.entries(prod.sizes).filter(([size, qty]) => qty === 0)
        );

        if (prod.stock === 0 || Object.keys(zeroSizes).length > 0) {
          return {
            _id: prod._id,
            name: prod.name,
            stock: prod.stock,
            zeroSizes,
            category:prod.category
          };
        }
        return null;
      })
      .filter(Boolean);

    if (outOfStockProducts.length === 0)
      return res.status(200).json({
        success: true,
        message: "No out-of-stock products found",
        products: [],
      });

    return res.status(200).json({
      success: true,
      products: outOfStockProducts,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: true,
      message: "Internal server error when getting out of stock products",
    });
  }
};
