import z from 'zod'

export const userSignup = z.object({
    username:z.string().optional(),
    password:z.string().min(8),
    email:z.string().email(),
})



export const userSignin = z.object({

    password:z.string().min(8),
    email:z.string().email(),
})



export const createBlogInput = z.object({

    title:z.string(),
    content:z.string(),
})



export const updateBlogInput = z.object({

    title:z.string().optional(),
    content:z.string().optional(),
})


export type signupSchema = z.infer<typeof userSignup>
export type signinSchema = z.infer<typeof userSignin>
export type createBlogInput = z.infer<typeof createBlogInput>
export type updateBlogInput = z.infer<typeof updateBlogInput>