import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../User/user.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/user.constant';
import isLogout from '../../middlewares/isLogout';

const router = express.Router();

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);

router.post(
  '/register',
  validateRequest(UserValidation.createUserValidationSchema),
  AuthControllers.registerUser,
);

router.post('/logout',
  auth(USER_ROLE.admin, USER_ROLE.user),
  isLogout(),
  AuthControllers.logout
);


export const AuthRoutes = router;
