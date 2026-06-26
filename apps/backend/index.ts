import express from "express"
import { appRouter } from "./routes"


const app = express()

app.use(express.json())



app.use("/api/v1",appRouter)



app.listen(3000,()=>{
    console.log(`app is listening to port 3000`)
})