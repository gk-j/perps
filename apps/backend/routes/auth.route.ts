
import { eventEnums, HttpStatus, signinSchema, signupSchema } from "@repo/commontypes";
import { prisma } from "@repo/db";
import { Router, type Request, type Response } from "express";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import { dispatchToEngine } from "../utils/dispatchToEngine";

export const authRouter = Router()


authRouter.post("/signup",async(req:Request,res:Response)=>{
    try {
        console.log(req.body)
        const {username,email,password} = req.body
        const result = signupSchema.safeParse(req.body)
        if(!result.success){
            return res.status(HttpStatus.BAD_REQUEST).json({
                message:"Invalid request body",
                errors: result.error
            })
        }
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(user){
            return res.status(HttpStatus.CONFLICT).json({
                message:"User Already Exist"
            })
        }

        const hasedPassword = await bcrypt.hash(password,10)

        const createdUser = await prisma.user.create({
            data:{
                email,
                username,
                password:hasedPassword
            },
            select:{
                id:true
            }
        })
        const requestId = crypto.randomUUID();
        const payload = {
            requestId: requestId,
            kind:eventEnums.CREATE_USER,
            payload: {
                userId: createdUser.id,
            },
        }
        const resp = await dispatchToEngine(payload, requestId);
        console.log(resp)
        return res.status(HttpStatus.CREATED).json({
            message:"Account Created Sucessfully"
        })
    } catch (error) {
        console.log(error)
        throw new Error("INTERNAL_SERVER_ERROR");
    }
})



authRouter.post("/signin",async(req:Request,res:Response)=>{
    try {
        const {email,password} = req.body
        const result = signinSchema.safeParse(req.body)
        if(!result.success){
            return res.status(HttpStatus.BAD_REQUEST).json({
                message:"Invalid request body",
                errors: result.error
            })
        }
        const user = await prisma.user.findFirst({
            where:{
                email
            }
        })
        if(!user){
            return res.status(HttpStatus.CONFLICT).json({
                message:"User does not  Exist"
            })
        }
        const isPasswordValid = await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            return res.status(HttpStatus.CONFLICT).json({
                message:"check your password"
            })
        }
        const jwtSecret = process.env.JWT_SECRET! 
        const jwtToken = jwt.sign({userId:user.id},jwtSecret,{
            expiresIn:"7d"
        })

        
        return res.status(HttpStatus.OK).json({
            message:"User SuccessFully LoggedIn",
            token:jwtToken,
            user : {
                id:user.id,
                username:user.username,
                email:user.email
            }
        })
    } catch (error) {
        console.log(error)
        throw new Error("INTERNAL_SERVER_ERROR");
    }
})