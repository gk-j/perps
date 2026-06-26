import express from "express"
import { appRouter } from "./routes"


const app = express()





app.use("api/vi",appRouter)



app.listen(3000,()=>{
    console.log(`app is listening to port 3000`)
})