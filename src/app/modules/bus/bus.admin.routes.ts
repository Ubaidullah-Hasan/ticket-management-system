import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BusControllers } from "./bus.controller";
import { BusValidationSchema } from "./bus.validation";

const router = Router();

router.post(
    '/',
    validateRequest(BusValidationSchema.busValidationCreateSchema),
    BusControllers.createBus
);

router.put(
    '/:busId',
    validateRequest(BusValidationSchema.busValidationUpdateSchema),
    BusControllers.updateBusInfo
);

export const AdminBusRoutes = router;
