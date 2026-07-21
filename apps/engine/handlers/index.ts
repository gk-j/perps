import { eventEnums } from "@repo/commontypes";
import { EventDispatcher, type EventHandler } from "../dispatcher/eventDispatcher";
import { CreateUserHandler } from "./user.handler";
import { stream2Publisher } from "../pubsub-stream3";






export const dispatcher = new EventDispatcher(
    new Map<string,EventHandler<any>>([
        [eventEnums.CREATE_USER, new CreateUserHandler()],
    ])
)


export async function handleIncomingEvents(parsedData:any){
    const response = dispatcher.dispatch(parsedData)
    console.log(response)
    if (response) {
        await stream2Publisher.publish("engine-events",response);
    }
}