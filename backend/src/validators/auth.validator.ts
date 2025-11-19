import * as z from 'zod';

export const loginValidator = z.object({
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(1, "Password is required"),
}).strict();

export const registerValidator = z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Invalid email address"),
    password: z.string().trim().min(6, "Password must be at least 6 characters long").nonempty("Password is required"),
}).strict()