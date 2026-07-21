import {z} from "zod"
import { ORDER_TYPE, SIDE } from ".."


export const createOrderSchema = z.object({
    market:z.string(),
    side:z.enum(SIDE),
    price:z.number(),
    quantity:z.number(),
    order_type:z.enum(ORDER_TYPE),
    leverage:z.number().int()
})

