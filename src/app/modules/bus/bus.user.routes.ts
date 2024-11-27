import { Router } from "express";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";
import { BusControllers } from "./bus.controller";
import isLogout from "../../middlewares/isLogout";

const router = Router();

router.get(
    '/',
    auth(USER_ROLE.user),
    isLogout(),
    BusControllers.getAllBuses
);

export const UserBusRoutes = router;
