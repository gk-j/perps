import { HttpStatus } from "@repo/commontypes";
import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken"


export function middleware(req:Request,res:Response,next:NextFunction){
    try {
        const authHeader = req.header("authorization");
        const token = authHeader?.startsWith("Bearer ")
            ? authHeader.slice(7).trim()
            : null;
        const jwtSecret = process.env.JWT_SECRET!
        if(!token || !jwtSecret){
            return res.status(HttpStatus.UNAUTHORIZED).json({message:"Please sign in to continue."}) 
        }
        const decoded = jwt.verify(token,jwtSecret) as { userId: number }
        if (!decoded?.userId) {
            return res.status(HttpStatus.UNAUTHORIZED).json({message:"Please sign in to continue."}) 
        }
        req.user = { userId: decoded.userId };
        next();

    } catch (error) {
        console.log(error)
        res.status(HttpStatus.UNAUTHORIZED).json({message:"Unauthorized"})
    }
}