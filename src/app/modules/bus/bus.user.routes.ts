import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";

const router = Router();

// router.post(
//     '/',
//     validateRequest(UserValidation.createUserValidationSchema),
//     UserControllers.createUser
// );

export const UserBusRoutes = router;
