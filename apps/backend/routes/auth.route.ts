
import { prisma } from "@repo/db";
import { Router, type Request, type Response } from "express";


export const authRouter = Router()


authRouter.post("/signup",async(req:Request,res:Response)=>{
    try {
        const {username,email,password} = req.body

        const user = await prisma.user.findFirst({
            where:{
                email,
                password
            }
        })
    } catch (error) {
        
    }
})