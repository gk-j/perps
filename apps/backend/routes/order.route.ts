import { Router } from "express";
import { middleware } from "./middleware";


export const orderRouter = Router()


orderRouter.use(middleware)

orderRouter.post("/",async(req,res)=>{
    
})