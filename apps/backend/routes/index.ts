import { Router} from "express";
import { authRouter } from "./auth.route";
import { orderRouter } from "./order.route";


export const appRouter = Router()



appRouter.use("/order",orderRouter)
appRouter.use("/auth",authRouter)