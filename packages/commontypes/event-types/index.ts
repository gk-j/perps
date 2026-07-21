import z from "zod";
export * from "./market-events"
export * from "./user-account"
export * from "./trading-actions"
export * from "./enums"
export * from "./eventSchema"

// export const  eventTypesSchema = z.discriminatedUnion("kind",
//     [   
//         // User & Account Setup
//         createUserPayloadSchema,
//         createUserResponseSchema,
//         creditBalancePayloadSchema,
//         creditBalanceResponseSchema,
//         getAccountStatePayloadSchema,
//         getAccountStateResponseSchema,
//         getOpenPositionsPayloadSchema,
//         getOpenPositionsResponseSchema,
//         getOpenOrdersPayloadSchema,
//         getOpenOrdersResponseSchema,
//         // Trading Actions
//         createOrderPayloadSchema,
//         createOrderResponseSchema,
//         cancelOrderPayloadSchema,
//         cancelOrderResponseSchema,
//         closePositionPayloadSchema
//         closePositionResponseSchema,
//         getOrderbookPayloadSchema,
//         getOrderbookResponseSchema,

//         // Price update
//         markPriceTickSchema

//         // Broadcasts
//         depthUpdateSchema,
//         tradeUpdateSchema,
//         userEventUpdateSchema,
//         indexPriceUpdateSchema
//     ]
// )