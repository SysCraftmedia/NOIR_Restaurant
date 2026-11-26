import { z } from 'zod'


export const UsernameValiationSchema = z
    .string()
    .min(2, 'username must be at least 2 character ')
    .max(20, 'username must be no more 20 character')
    .regex(/^[a-zA-Z0-9_]+$/, 'username  no more contain special character ')







export const SignUpSchema = z.object({
    username: UsernameValiationSchema,
    Email: z.string().email({ message: 'Email  is invalid' }),
    Password: z.string().min(6, { message: ' password  must be minimum 6 character ' })
})