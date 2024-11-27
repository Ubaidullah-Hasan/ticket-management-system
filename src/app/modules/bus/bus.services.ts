/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from "http-status-codes";
import AppError from "../../errors/AppError";
import { IBus } from "./bus.interface"
import { Bus } from "./bus.model"

const createBusIntoDB = async (newBusData: IBus) => {
    // may be more bus have a company and he want to shedules at a same time => i can't do handle it
    const bus = await Bus.create(newBusData);
    return bus;
}

const updateBusInfo = async (busId: string, updatedBusData: Partial<IBus>) => {
    const bus = await Bus.findById(busId);

    if (!bus) {
        throw new AppError(StatusCodes.NOT_FOUND, "Bus not found!");
    }

    bus.busName = updatedBusData.busName || bus.busName;
    bus.company = updatedBusData.company || bus.company;
    bus.type = updatedBusData.type || bus.type;
    bus.seatCount = updatedBusData.seatCount || bus.seatCount;
    bus.availableSeats = updatedBusData.availableSeats || bus.availableSeats;
    bus.route = updatedBusData.route || bus.route;
    bus.schedules = updatedBusData.schedules || bus.schedules;
    bus.ticketPrice = updatedBusData.ticketPrice || bus.ticketPrice;


    const updatedBus = await bus.save();
    return updatedBus;
}

export const BusServices = {
    createBusIntoDB,
    updateBusInfo,
}