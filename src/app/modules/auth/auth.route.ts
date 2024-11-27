import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthControllers } from './auth.controller';
import { AuthValidation } from './auth.validation';
import { UserValidation } from '../User/user.validation';

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

router.post('/logout', AuthControllers.logout);


export const AuthRoutes = router;
