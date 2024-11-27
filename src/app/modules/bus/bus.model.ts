import { model, Schema } from "mongoose";
import { IBus } from "./bus.interface";

const busSchema = new Schema<IBus>(
    {
        busName: {
            type: String,
            required: [true, 'Bus name is required'],
            trim: true,
            minlength: [3, 'Bus name must be at least 3 characters long'],
        },
        company: {
            type: String,
            required: [true, 'Company name is required'],
            trim: true,
        },
        type: {
            type: String,
            enum: ['AC', 'Non-AC'],
            required: [true, 'Bus type is required'],
        },
        seatCount: {
            type: Number,
            required: [true, 'Seat count is required'],
            min: [1, 'Seat count must be at least 1'],
        },
        availableSeats: {
            type: Number,
            required: true,
            validate: {
                validator: function (value: number) {
                    return value <= this.seatCount;
                },
                message: 'Available seats cannot exceed total seat count',
            },
        },
        route: {
            from: { type: String, required: [true, 'Starting location is required'] },
            to: { type: String, required: [true, 'Destination location is required'] },
        },
        schedules: [
            {
                date: { type: Date, required: true },
                time: { type: String, required: true },
                isCanceled: { type: Boolean, default: false },
            },
        ],
        ticketPrice: {
            type: Number,
            required: [true, 'Ticket price is required'],
            min: [0, 'Ticket price must be at least 0'],
        },
    },
    { timestamps: true }
);

export const Bus = model<IBus>('Bus', busSchema);