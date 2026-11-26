import {z} from "zod";


export const EmailVerifySchema = z.object({
    Otp:z.string()
    .length(6 , { message:  'Varification Code must be 6 digits '}) 
    .regex(/^[0-9]+$/ , 'varfication code must conatin digits only ')
})