import express from "express"
import { appRouter } from "./routes"
import { create_consumer_grp } from "./utils/dispatchToEngine"


const app = express()

app.use(express.json())



app.use("/api/v1",appRouter)


create_consumer_grp()
app.listen(3000,()=>{
    console.log(`app is listening to port 3000`)
})