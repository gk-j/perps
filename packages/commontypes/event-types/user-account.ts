import z from "zod";

import { ORDER_TYPE, SIDE } from "..";
import { eventEnums, eventResponseEnums } from "./enums";



export const createUserPayloadSchema = z.object({
    requestId:z.string(),
    type:z.literal(eventEnums.CREATE_USER),
    payload:z.object({
        userId:z.string()
    })
})


export const createUserResponseSchema = z.object({
    requestId:z.string(),
    type:z.literal(eventResponseEnums.CREATE_USER_RESPONSE),
    data:z.object({
        success: z.boolean(),
    message: z.string().nullable(),
    data: z.object({
        userId: z.string(),
      })
      .nullable(), //failure case it can be null
    })
})

export const createOrderPayloadSchema = z.object({
  requestId: z.string(),
  type: z.literal(eventEnums.CREATE_ORDER),
  userId: z.string(),
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


export const createOrderResponseSchema = z.object({
  type: z.literal(eventResponseEnums.CREATE_ORDER_RESPONSE),
  requestId: z.string(),
  data: z.object({
    success: z.boolean(),
    message: z.string().nullable(),
    
  }),
});