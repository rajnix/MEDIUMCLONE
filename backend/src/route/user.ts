import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";



export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_KEY: string;
    },
    Variables:{
        userID:string,
    }
}>();


userRouter.post('/signup', async (c) => {

    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    try {
      const user = await prisma.user.create({
        data: {
          email: body.email,
          password: body.password
        }
      })
  
  
      const jwt = await sign({ id: user.id }, c.env.JWT_KEY);
  
      return c.json({ jwt })
  
    } catch (e) {
      c.status(403)
      return c.json({ msg: "sign up failed successfully"})
    }
  
  })
  
  userRouter.post('/signin', async(c) => {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
  
    const body = await c.req.json();
    try{
      const user = await prisma.user.findUnique({
        where:{
          email:body.email,
          password: body.password
        }
      })
      if(!user){
        c.status(403);
        return c.text("user not found")
      }
      const jwt = await sign({id:user.id},c.env.JWT_KEY)
      return c.json({jwt})
    }catch(e){
      return c.text("invalid details")
    }
  
  
  
  })