import { Router } from 'express';
import { UserRoutes } from '../modules/User/user.routes';
import { AuthRoutes } from '../modules/auth/auth.route';
import { AdminBusRoutes } from '../modules/bus/bus.admin.routes';
import { UserBusRoutes } from '../modules/bus/bus.user.routes';

const router = Router();

const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
    {
        path: '/admin/bus',
        route: AdminBusRoutes,
    },
    {
        path: '/buses',
        route: UserBusRoutes,
    },

];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
