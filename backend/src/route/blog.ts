
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";
import { auth } from "hono/utils/basic-auth";


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_KEY: string;
    },
    Variables:{
        userID:string,
    }
}>();

blogRouter.use('/*',async(c,next)=>{
    const authHeader = c.req.header("Authorization") || "";
    const user = await verify(authHeader,c.env.JWT_KEY);
    if(user){
        c.set('userID',user.id as string);
        await  next()
    }
    else{
        c.status(411);
        return c.json({msg:"you are not logged in"})
    }
})



blogRouter.get('/bulk', async(c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

 
    try {
        const post = await prisma.blog.findMany();
        return c.json({ post })
    } catch (e) {
        console.log(e)
        c.status(403)
        return c.json({ msg: "Something went wrong , please try again later" })
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
                id:Number(id)
            }
        })

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
                authorID:Number(userID)
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
                authorID:Number(userID),
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
