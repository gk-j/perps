import z from "zod";
import { createOrderPayloadSchema, createOrderResponseSchema, createUserPayloadSchema, createUserResponseSchema } from "../event-types/user-account";

export const eventSchema = z.discriminatedUnion("type", [
  createUserPayloadSchema,
  createUserResponseSchema, 
  createOrderPayloadSchema,
  createOrderResponseSchema,
]);