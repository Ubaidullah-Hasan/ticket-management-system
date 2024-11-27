import { z } from 'zod';

const busValidationCreateSchema = z.object({
    body: z.object({
        busName: z
            .string()
            .min(3, 'Bus name must be at least 3 characters long')
            .max(100, 'Bus name cannot exceed 100 characters'),
        company: z
            .string()
            .nonempty('Company name is required')
            .max(100, 'Company name cannot exceed 100 characters'),
        type: z.enum(['AC', 'Non-AC'], {
            required_error: 'Bus type is required. Please select either "AC" or "Non-AC".',
        }),
        seatCount: z
            .number()
            .min(1, 'Seat count must be at least 1')
            .max(100, 'Seat count cannot exceed 100'),
        availableSeats: z
            .number()
            .min(0, 'Available seats cannot be negative'),
        route: z.object({
            from: z.string().nonempty('Starting location is required'),
            to: z.string().nonempty('Destination location is required'),
        }),
        schedules: z.array(
            z.object({
                date: z.string().refine((value) => !isNaN(Date.parse(value)), {
                    message: "Invalid date format, must be a valid ISO string",
                }),
                startTime: z.string()
                    .regex(
                        /^(0[1-9]|1[0-2]):([0-5]\d)\s(AM|PM)$/,
                        'Time must be in HH:MM AM/PM format and range is :00 to :59'
                    ), // Regex to match 12-hour format with AM/PM,
                endTime: z.string()
                    .regex(
                        /^(0[1-9]|1[0-2]):([0-5]\d)\s(AM|PM)$/,
                        'Time must be in HH:MM AM/PM format and range is :00 to :59'
                    ), // Regex to match 12-hour format with AM/PM,
                isCanceled: z.boolean().optional().default(false),
            })
        ),
        ticketPrice: z
            .number()
            .min(0, 'Ticket price must be at least 0')
            .max(10000, 'Ticket price cannot exceed 10,000'),
    })
})

const busValidationUpdateSchema = z.object({
    body: z.object({
        busName: z
            .string()
            .min(3, 'Bus name must be at least 3 characters long')
            .max(100, 'Bus name cannot exceed 100 characters')
            .optional(),
        company: z
            .string()
            .nonempty('Company name is required')
            .max(100, 'Company name cannot exceed 100 characters')
            .optional(),
        type: z.enum(['AC', 'Non-AC'], {
            required_error: 'Bus type is required. Please select either "AC" or "Non-AC".',
        })
            .optional(),
        seatCount: z
            .number()
            .min(1, 'Seat count must be at least 1')
            .max(100, 'Seat count cannot exceed 100')
            .optional(),
        availableSeats: z
            .number()
            .min(0, 'Available seats cannot be negative')
            .optional(),
        route: z.object({
            from: z.string().nonempty('Starting location is required'),
            to: z.string().nonempty('Destination location is required'),
        }).optional(),
        schedules: z.array(
            z.object({
                date: z.string().refine((value) => !isNaN(Date.parse(value)), {
                    message: "Invalid date format, must be a valid ISO string",
                }),
                startTime: z.string()
                    .regex(
                        /^(0[1-9]|1[0-2]):([0-5]\d)\s(AM|PM)$/,
                        'Time must be in HH:MM AM/PM format and range is :00 to :59'
                    ), // Regex to match 12-hour format with AM/PM,
                endTime: z.string()
                    .regex(
                        /^(0[1-9]|1[0-2]):([0-5]\d)\s(AM|PM)$/,
                        'Time must be in HH:MM AM/PM format and range is :00 to :59'
                    ), // Regex to match 12-hour format with AM/PM,
                isCanceled: z.boolean().optional().default(false),
            })
        ).optional(),
        ticketPrice: z
            .number()
            .min(0, 'Ticket price must be at least 0')
            .max(10000, 'Ticket price cannot exceed 10,000')
            .optional(),
    })
})


export const BusValidationSchema = {
    busValidationCreateSchema,
    busValidationUpdateSchema
}