import express from 'express';
import { addProductController} from '../controllers/addProductController.js';
import { getAllProductsController } from '../controllers/getAllProductsController.js';
import { getProductsByCategoryController } from '../controllers/getProductByCategoryController.js';
import { deleteProductController } from '../controllers/deleteProductController.js';
import { searchProductController } from '../controllers/searchProductController.js';
import { getNewestProductsController } from '../controllers/getNewestProductController.js';
import { getProductDetailsContainer } from '../controllers/getProductDetailsController.js';
import { setCartItemController } from '../controllers/setCartItemController.js';
import { getCartItemsController } from '../controllers/getCartItemsController.js';
import { deleteCartItemController } from '../controllers/deleteCartItemController.js';
import { getTotalCartCountController } from '../controllers/getTotalCartCountController.js';
import { updateCartItemController } from '../controllers/updateCartItemController.js';
import { getCheckoutProductController } from '../controllers/getCheckoutProductController.js';
import { getTopProdcutController } from '../controllers/getTopProductController.js';
import { getProductListController } from '../controllers/AdminDashboardController/getProductListController.js';
import { updateProductController } from '../controllers/AdminDashboardController/updateProductController.js';
import { deleteProductControllerByAdmin } from '../controllers/AdminDashboardController/deleteProductControllerByAdmin.js';
import { getOutofProductsController } from '../controllers/AdminDashboardController/getOutofProdcutsController.js';
import { getRecentOrdersController } from '../controllers/AdminDashboardController/getRecentOrdersController.js';
import { changeStatusController } from '../controllers/AdminDashboardController/changeStatusController.js';
import { getTotalSalesController } from '../controllers/AdminDashboardController/getTotalSalesController.js';
import { getUsersOrderItemController } from '../controllers/userDashboardController/getUsersOrderItemController.js';
import { getBuyedProductListController } from '../controllers/userDashboardController/getBuyedProductControllerList.js';
import { uploads } from '../config/cloudinary.js';
import { setWishlistItemController } from '../controllers/setWishlistItemController.js';


const productRoutes = express.Router();

productRoutes.post(
  "/addproduct",
  uploads.array("images", 5),
  addProductController
);

// productRoutes.post(
//   "/addproduct",
//   upload.array("images", 5), 
//   addProductController
// );

productRoutes.get(`/getallproducts`,getAllProductsController);
productRoutes.get(`/search`,searchProductController);
productRoutes.get(`/getnewestproducts`,getNewestProductsController);
productRoutes.post(`/deleteproduct`,deleteProductController);
productRoutes.get(`/getcartitems`,getCartItemsController);
productRoutes.post(`/setcartitem`,setCartItemController);
productRoutes.delete(`/deletecartitem`,deleteCartItemController);
productRoutes.get(`/gettotalcartcount`,getTotalCartCountController);
productRoutes.patch(`/updatecartitem`,updateCartItemController);
productRoutes.get(`/getcheckoutproducts`,getCheckoutProductController);
productRoutes.get(`/get-top-products`,getTopProdcutController);
productRoutes.get(`/get-product-list`,getProductListController);
productRoutes.put(`/update-product`,updateProductController);
productRoutes.delete(`/delete-product/:id`,deleteProductControllerByAdmin);
productRoutes.get(`/get-outofstock-products`,getOutofProductsController);
productRoutes.get(`/get-recent-orders`,getRecentOrdersController);
productRoutes.patch(`/change-status`,changeStatusController);
productRoutes.get(`/get-total-sales`,getTotalSalesController);
productRoutes.get(`/getusers-order-item/:id`,getUsersOrderItemController);
productRoutes.get(`/get-buyed-list/:id`,getBuyedProductListController);
productRoutes.post(`/set-wishlist-item`,setWishlistItemController);

productRoutes.get(`/getproductdetails/:id`, getProductDetailsContainer);
productRoutes.get(`/:category`,getProductsByCategoryController);

export default productRoutes;