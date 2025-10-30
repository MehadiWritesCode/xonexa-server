import express from 'express';
import { signupController } from '../controllers/signupController.js';
import { signupValidation } from '../middlewares/signupValidation.js';
import { loginController } from '../controllers/loginController.js';
import { loginValidator } from '../middlewares/loginValidator.js';
import { googleSignupController } from '../controllers/googleSignupController.js';
import { googleLoginController } from '../controllers/googleLoginController.js';
import { getAllUsersController } from '../controllers/getAllUsersController.js';
import { deleteUserController } from '../controllers/deleteUserController.js';
import { setCheckoutDeatilsController } from '../controllers/setCheckoutdetailsController.js';
import { validateCheckout } from '../middlewares/validateCheckout.js';
import { getUserSummaryController } from '../controllers/userDashboardController/getUserSummaryController.js';
import { getAnalyticsDataController } from '../controllers/userDashboardController/getAnalyticsDataController.js';
import { getLoginTypeController } from '../controllers/userDashboardController/getLoginTypeController.js';
import { updateEmailController } from '../controllers/userDashboardController/updateEmailController.js';
import { userUpdatedEmailValidator } from '../middlewares/userUpdatedEmailValidator.js';
import { userChangePasswordController } from '../controllers/userDashboardController/userChangePasswordController.js';
import { userChangePasswordValidator } from '../middlewares/userChangePasswordValidator.js';

const userRoutes = express.Router();

userRoutes.post(`/signup`,signupValidation,signupController);
userRoutes.post(`/login`,loginValidator,loginController);
userRoutes.post(`/googlesignup`,googleSignupController);
userRoutes.post(`/googlelogin`,googleLoginController);
userRoutes.get(`/getallusers`,getAllUsersController);
userRoutes.delete(`/deleteuser/:id`,deleteUserController);
userRoutes.post(`/setcheckoutdetails`,validateCheckout,setCheckoutDeatilsController);
userRoutes.get(`/get-user-summary/:id`,getUserSummaryController);
userRoutes.get(`/get-analytics-data/:id`,getAnalyticsDataController);
userRoutes.get(`/login-by-Google/:id`,getLoginTypeController);
userRoutes.patch(`/update-email`,userUpdatedEmailValidator,updateEmailController);
userRoutes.patch(`/change-password`,userChangePasswordValidator,userChangePasswordController)

export default userRoutes;