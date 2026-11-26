import {z} from "zod";

export const ChangePasswordSchema = z.object({
    CurrentPassword: z.string().min(6 , 'password must be 6 character '),
    NewPassword: z.string().min(6 , 'New password must be minimum 6 charater ')
})