import {z} from "zod";


export const ForgotPasswordSchema = z.object({
    Email: z.string().email('Invalid email address')
})