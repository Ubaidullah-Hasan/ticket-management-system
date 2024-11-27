import { z } from 'zod';

export const busValidationSchema = z.object({
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
                date: z.date({ required_error: 'Schedule date is required' }),
                time: z
                    .string()
                    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, 'Time must be in HH:MM format'),
                isCanceled: z.boolean().optional().default(false),
            })
        ),
        ticketPrice: z
            .number()
            .min(0, 'Ticket price must be at least 0')
            .max(10000, 'Ticket price cannot exceed 10,000'),
    })
}).refine(
    (data) => data.body.availableSeats <= data.body.seatCount,
    {
        path: ['body', 'availableSeats'],
        message: 'Available seats cannot exceed total seat count',
    }
);

export type BusValidationInput = z.infer<typeof busValidationSchema>;
