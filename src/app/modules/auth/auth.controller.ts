import { StatusCodes } from 'http-status-codes';
import config from '../../config';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { refreshToken, accessToken } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User is logged in succesfully!',
    data: {
      accessToken,
      refreshToken,
    },
  });
});


const registerUser = catchAsync(async (req, res) => {

  const result = await AuthServices.registerUser(req.body);
  const { refreshToken, accessToken, newUser } = result;

  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: true,
  });

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registered in successfully!',
    data: {
      newUser,
      accessToken,
      refreshToken,
    },
  });
});


const logout = catchAsync(async (req, res) => {
  const { cookie } = req.headers; 
  const refreshToken = cookie?.split("=")[1];

  const result = await AuthServices.logoutUser(refreshToken as string);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User logout in successfully!',
    data: result,
  });
});



export const AuthControllers = {
  loginUser,
  registerUser,
  logout,
};
