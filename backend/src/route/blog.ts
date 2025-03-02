import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { auth } from "hono/utils/basic-auth";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables:{
        userID:string,
    }
}>();

blogRouter.use('/*',async(c,next)=>{
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET);
    if(user){
        c.set('userID',user.id as string);
        await  next()
    }
    else{
        c.status(411);
        return c.json({msg:"you are not logged in"})
    }
})

blogRouter.get('/:id', async(c) => {
    const id = c.req.param('id')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

 
    try {
        const post = await prisma.blog.findUnique({
            where: {
                id
            }
        })

        return c.json({ post })
    } catch (e) {
        c.status(403)
        return c.json({ msg: "Something went wrong , please try again later" })
    }
    
})

blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

 
    try {
        const post = await prisma.blog.find({})

        return c.json({ post })
    } catch (e) {
        c.status(403)
        return c.json({ msg: "Something went wrong , please try again later" })
    }
    
})



blogRouter.post('/', async (c) => {
    const userID = c.get('userID')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try {
        const post = await prisma.blog.create({
            data: {
                title: body.title,
                content: body.content,
                authorID:userID
            }
        })

        return c.json({ post })
    } catch (e) {
        c.status(403)
        return c.json({ msg: "Something went wrong , please try again later" })
    }

})



blogRouter.put('/', async(c) => {
    const userID = c.get('userID')
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try {
        const post = await prisma.blog.update({
            where:{
                authorID:userID,
                id:body.id
            }
            ,
            data: {
                title: body.title,
                content: body.content,
            }
        })

        return c.json({ post })
    } catch (e) {
        c.status(403)
        return c.json({ msg: "Something went wrong , please try again later" })
    }
})
