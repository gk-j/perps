// listening to stream from backend
import { createClient } from "redis";



export const subscriberStream1 =  createClient()
subscriberStream1.on('error', err => console.log('Redis Client Error', err));
await subscriberStream1.connect();
console.log("stream1 status",subscriberStream1.isOpen)

while(true){
    try {
        const CONSUMER_GROUP = 'backend'
        const CONSUMER_NAME =  `engine-${Math.random()}`
        const response = await subscriberStream1.xReadGroup(CONSUMER_GROUP,CONSUMER_NAME,[{key:"stream1",id:">"}],{BLOCK:1000,COUNT:1})

        if(!response || !Array.isArray(response)) continue
        for (const msg of response[0]?.messages){
            console.log(JSON.parse(msg.message.data))
        }
    } catch (error) {
        console.log(error)
    }
}