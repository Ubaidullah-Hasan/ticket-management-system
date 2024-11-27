import { NextFunction, Request, Response } from "express";
import { User } from "../modules/User/user.model";
import catchAsync from "../utils/catchAsync";

const isLogout = () => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const { email } = req.user;
        const user = await User.findOne({ email });
        const { cookie } = req.headers;
        const refreshToken = cookie?.split("=")[1];
        if (user?.blacklistedTokens === refreshToken) {
            throw new Error("Unauthorized: Please login again.");
        }

        next();
    })

}

export default isLogout;

