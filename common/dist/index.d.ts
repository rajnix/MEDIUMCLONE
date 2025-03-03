import z from 'zod';
export declare const userSignup: z.ZodObject<{
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
    username?: string | undefined;
}, {
    password: string;
    email: string;
    username?: string | undefined;
}>;
export declare const userSignin: z.ZodObject<{
    password: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    password: string;
    email: string;
}, {
    password: string;
    email: string;
}>;
export declare const createBlogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    title?: string | undefined;
    content?: string | undefined;
}, {
    title?: string | undefined;
    content?: string | undefined;
}>;
export type signupSchema = z.infer<typeof userSignup>;
export type signinSchema = z.infer<typeof userSignin>;
export type createBlogInput = z.infer<typeof createBlogInput>;
export type updateBlogInput = z.infer<typeof updateBlogInput>;
