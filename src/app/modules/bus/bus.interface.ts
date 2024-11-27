import { Document } from "mongoose";

export interface IBus extends Document {
    busName: string;
    company: string;
    type: 'AC' | 'Non-AC';
    seatCount: number;
    availableSeats: number;
    route: {
        from: string;
        to: string;
    };
    schedules: {
        date: Date;
        startTime: string;
        endTime: string;
        isCanceled: boolean;
    }[];
    ticketPrice: number;
}