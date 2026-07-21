//publisher
import { createClient } from "redis";

export const publisherClient =  createClient()
publisherClient.on('errror',err=>console.log("Reddis  Publisher client error",err))
await publisherClient.connect()


console.log("publisher connected",publisherClient.isReady)

// stream3

export const stream2Publisher = createClient()
stream2Publisher.on('errror',err=>console.log("Reddis PubSub Publisher client error",err))
await stream2Publisher.connect()

console.log("stream2Publisher ",stream2Publisher.isReady)