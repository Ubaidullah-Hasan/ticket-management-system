import config from '../../config';
import { User } from '../User/user.model';
import { TLoginUser } from './auth.interface';
import AppError from '../../errors/AppError';
import { createToken } from './auth.utils';
import { StatusCodes } from 'http-status-codes';
import { TUser } from '../User/user.interface';
import jwt from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }
  // checking if the user is already deleted

  const isDeleted = user?.isDeleted;

  if (isDeleted) {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is deleted !');
  }

  // checking if the user is blocked

  const userStatus = user?.status;

  if (userStatus === 'blocked') {
    throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked ! !');
  }

  //checking if the password is correct

  if (!(await User.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');

  //create token and sent to the  client

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    status: user.status,
    isDeleted: user.isDeleted,
  };


  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expire_in as string,
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_expire_in as string,
  );

  if (refreshToken && accessToken) {
    await User.findOneAndUpdate({ email: payload.email },
      { blacklistedTokens: "", }
    );
  }
  return {
    accessToken,
    refreshToken,
  };
};

const registerUser = async (payload: TUser) => {
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);

  if (user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is already exist!');
  }

  const newUser = await User.create(payload);

  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    status: newUser.status,
    isDeleted: newUser.isDeleted,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_secret_expire_in as string
  );

  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_secret_expire_in as string
  );

  return {
    newUser,
    accessToken,
    refreshToken,
  };
};

type TDecodedToken = {
  _id: string,
  name: string,
  email: string, 
  role: string,
  status: string,
  isDeleted: boolean,
  iat: number,
  exp: number
}

const logoutUser = async (refreshToken: string) => {
  if (!refreshToken) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Refresh token is required!');
  }


  const decodedToken = jwt.decode(refreshToken) as TDecodedToken;

  await User.findOneAndUpdate({ email: decodedToken?.email },
    { blacklistedTokens: refreshToken },
    { new: true }
  );

  return "";
};


export const AuthServices = {
  loginUser,
  registerUser,
  logoutUser,
};
