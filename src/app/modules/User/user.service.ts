import AppError from '../../errors/AppError';
import { TUser } from './user.interface';
import { User } from './user.model';
import { StatusCodes } from 'http-status-codes';

const createUserIntoDB = async (payload: TUser) => {
  const existUser = await User.findOne({email: payload.email});

  if(existUser){
    throw new AppError(StatusCodes.BAD_GATEWAY, "User already exists!");
  }

  const user = await User.create(payload);
  return user;
};




export const UserServices = {
  createUserIntoDB,
};
