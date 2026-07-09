import { Router } from "express";
import { middleware } from "./middleware";
import  { createOrderSchema, HttpStatus } from "@repo/commontypes";
import { dispatchToEngine } from "../utils/dispatchToEngine";


export const orderRouter = Router()


// orderRouter.use(middleware)

orderRouter.post("/",async(req,res)=>{
    console.log(req.body)
    const parsed = createOrderSchema.safeParse(req.body);
    if (!parsed.success) {
        return res.status(HttpStatus.BAD_REQUEST).json({ error: parsed.error });
    }
    const data = parsed.data; 
    const requestId = crypto.randomUUID();
    const payload = {
        requestId,
        type:"create_order",
        userId: "",
        payload:{
            requestId,
            ...data
        }
    }


    try {
        const response = await dispatchToEngine(payload,requestId)    
        return res.status(HttpStatus.OK).json({message:"Order submitted successfully.",response})
    } catch (error) {
        return res.status(HttpStatus.GATEWAY_TIMEOUT).json({message:"Request timed out. Please try again."})
    }
})