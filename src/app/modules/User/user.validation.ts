import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().min(3, {message: "Name must contain 3 characters"}),
  email: z.string().email({message: "Invalid email!"}).trim(),
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
});

export const UserValidation = {
  userValidationSchema,
};
