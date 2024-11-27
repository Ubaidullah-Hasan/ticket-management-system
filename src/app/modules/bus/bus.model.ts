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
                startTime: { type: String, required: true },
                endTime: { type: String, required: true },
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


busSchema.pre('save', function (next) {

    if (!this.isModified('schedules')) {
        return next();  // if put does not work it directly returns
    }
    
    const currentDate = new Date(); // Current date and time

    this.schedules.forEach((schedule, index) => {
        const startDateTime = new Date(schedule.date);
        const [startTime, startPeriod] = schedule.startTime.split(' ');
        const [startHours, startMinutes] = startTime.split(':').map(Number);

        // Convert 12-hour format to 24-hour format for start time
        let adjustedStartHours = startHours;

        if (startPeriod === 'PM' && startHours !== 12) {
            adjustedStartHours += 12; // Convert PM hours (except 12 PM) to 24-hour format
        } else if (startPeriod === 'AM' && startHours === 12) {
            adjustedStartHours = 0; // Convert 12 AM to 00:00
        }

        startDateTime.setHours(adjustedStartHours, startMinutes, 0, 0);

        const endDateTime = new Date(schedule.date);
        const [endTime, endPeriod] = schedule.endTime.split(' ');
        const [endHours, endMinutes] = endTime.split(':').map(Number);

        // Convert 12-hour format to 24-hour format for end time
        let adjustedEndHours = endHours;

        if (endPeriod === 'PM' && endHours !== 12) {
            adjustedEndHours += 12; // Convert PM hours (except 12 PM) to 24-hour format
        } else if (endPeriod === 'AM' && endHours === 12) {
            adjustedEndHours = 0; // Convert 12 AM to 00:00
        }

        endDateTime.setHours(adjustedEndHours, endMinutes, 0, 0);

        // Check if the start date-time is in the past
        if (startDateTime < currentDate) {
            const err = new Error('Bus schedule start time cannot be in the past.');
            return next(err);
        }

        // Check if the end time is before the start time
        if (endDateTime <= startDateTime) {
            const err = new Error('End time cannot be before or equal to start time.');
            return next(err);
        }

        // Now check if the current schedule overlaps with any previous schedule for the same date
        this.schedules.forEach((otherSchedule, otherIndex) => {
            // Skip comparison with itself
            if (index === otherIndex) return;

            const otherStartDateTime = new Date(otherSchedule.date);
            const [otherStartTime, otherStartPeriod] = otherSchedule.startTime.split(' ');
            const [otherStartHours, otherStartMinutes] = otherStartTime.split(':').map(Number);

            let adjustedOtherStartHours = otherStartHours;

            if (otherStartPeriod === 'PM' && otherStartHours !== 12) {
                adjustedOtherStartHours += 12;
            } else if (otherStartPeriod === 'AM' && otherStartHours === 12) {
                adjustedOtherStartHours = 0;
            }

            otherStartDateTime.setHours(adjustedOtherStartHours, otherStartMinutes, 0, 0);

            const otherEndDateTime = new Date(otherSchedule.date);
            const [otherEndTime, otherEndPeriod] = otherSchedule.endTime.split(' ');
            const [otherEndHours, otherEndMinutes] = otherEndTime.split(':').map(Number);

            let adjustedOtherEndHours = otherEndHours;

            if (otherEndPeriod === 'PM' && otherEndHours !== 12) {
                adjustedOtherEndHours += 12;
            } else if (otherEndPeriod === 'AM' && otherEndHours === 12) {
                adjustedOtherEndHours = 0;
            }

            otherEndDateTime.setHours(adjustedOtherEndHours, otherEndMinutes, 0, 0);

            // Check for overlap
            if (
                (startDateTime < otherEndDateTime && endDateTime > otherStartDateTime) || // Overlap condition
                (otherStartDateTime < endDateTime && otherEndDateTime > startDateTime)
            ) {
                const err = new Error('Bus schedules cannot overlap for the same date.');
                return next(err); // If overlap, throw error
            }
        });
    });

    next(); // Proceed with saving if no errors
});





export const Bus = model<IBus>('Bus', busSchema);