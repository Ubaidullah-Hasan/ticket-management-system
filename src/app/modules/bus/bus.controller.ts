import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BusServices } from './bus.services';

const createBus = catchAsync(async (req, res) => {

    const result = await BusServices.createBusIntoDB(req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Bus is created succesfully',
        data: result,
    });
});


const updateBusInfo = catchAsync(async (req, res) => {
    const { busId } = req.params;

    const result = await BusServices.updateBusInfo(busId, req.body);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Bus data updated succesfully',
        data: result,
    });
});


const deleteBus = catchAsync(async (req, res) => {
    const { busId } = req.params;

    const result = await BusServices.deleteBus(busId);

    sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Bus delete succesfully',
        data: result,
    });
});


export const BusControllers = {
    createBus,
    updateBusInfo,
    deleteBus
};
