import {z} from "zod";


export const ResetPasswordSchema = z.object({
    Token: z.string().jwt('Token is required ') ,
    NewPassword: z.string().min(6  , 'Password must be minimum 6 character ')
})