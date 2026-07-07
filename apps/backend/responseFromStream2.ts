import { createClient } from "redis";



const responseFromStream2 =  createClient()


responseFromStream2.on('error', err => console.log('Redis Client Error', err));

await responseFromStream2.connect();
console.log("responseFromStream2 status",responseFromStream2.isOpen)



