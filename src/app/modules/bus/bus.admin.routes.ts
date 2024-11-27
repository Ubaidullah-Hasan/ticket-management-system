import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BusControllers } from "./bus.controller";
import { BusValidationSchema } from "./bus.validation";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import isLogout from "../../middlewares/isLogout";

const router = Router();

router.post(
    '/',
    auth(USER_ROLE.admin),
    isLogout(),
    validateRequest(BusValidationSchema.busValidationCreateSchema),
    BusControllers.createBus
);

router.put(
    '/:busId',
    auth(USER_ROLE.admin),
    isLogout(),
    validateRequest(BusValidationSchema.busValidationUpdateSchema),
    BusControllers.updateBusInfo
);

router.delete(
    '/:busId',
    auth(USER_ROLE.admin),
    isLogout(),
    BusControllers.deleteBus
);


export const AdminBusRoutes = router;
