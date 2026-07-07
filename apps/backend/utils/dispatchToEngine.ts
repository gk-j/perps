import { stream1 } from "../redis"
import { requestMap } from "../requestMap"

const BACKEND_CONSUMER_GROUP = "backend"
//creating consumer grp for stream1
export async function create_consumer_grp(){
    try {
        // "stream1" — the stream key (my send_queue).
        // BACKEND_CONSUMER_GROUP — the group name.
        // '$' — start point. '$' = "only messages arriving after now." Use '0' if you want to also process everything already sitting in the stream.
        // MKSTREAM: true — create the stream if it doesn't exist yet (otherwise this throws when the stream is empty).
        await stream1.xGroupCreate("stream1",BACKEND_CONSUMER_GROUP,'$',{
            MKSTREAM:true
        })
    } catch (e) {
        if (e instanceof Error && e.message.includes("BUSYGROUP")){
            // group already exists — that's fine
        }else{
             throw e;
        }
        
    }
}

export  async function dispatchToEngine(
    event:Record<string,unknown>,
    requestId:string
):Promise<any>{
    // 1. push the order onto stream1
    await stream1.xAdd("stream1","*",{
        data: JSON.stringify(event)
    })
    return new Promise((resolve,reject)=>{
        const timeOutId = setTimeout(()=>{
            requestMap.delete(requestId)
            reject(new Error("Request timed out"));
        },10000)
        requestMap.set(requestId,{timeOutId,resolve,reject})
    })
}