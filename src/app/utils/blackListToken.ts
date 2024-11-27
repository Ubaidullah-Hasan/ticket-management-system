import { User } from "../modules/User/user.model";

const isTokenValid = async (userId: string, token: string) => {
    const user = await User.findById(userId);
    if (user?.blacklistedTokens?.includes(token)) {
        throw new Error("Unauthorized: Please login again.");
    }
};

export default isTokenValid;