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



export const createOrderPayloadSchema = z.object({
  requestId: z.string(),
  kind: z.literal("create_order"),
  userId: z.number(),
  payload: z.object({
    id: z.string(),
    market: z.string(),
    side: z.enum(SIDE),
    qty: z.number(),
    orderType: z.enum(ORDER_TYPE),
    price: z.number(),
    leverage: z.number().int(),
  }),
});