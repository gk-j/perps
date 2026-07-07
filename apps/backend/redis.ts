import { createClient } from "redis";



export const stream1 =  createClient()


stream1.on('error', err => console.log('Redis Client Error', err));

await stream1.connect();
console.log("stream1 status",stream1.isOpen)