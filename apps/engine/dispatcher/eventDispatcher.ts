// sending the incoming events to their handlers




export interface EventHandler<T=any>{
    handle(event:T):any
}


export class EventDispatcher {
    constructor(private handlers: Map<string, EventHandler<any>>) {}

    dispatch(event:any){
        const handler = this.handlers.get(event.kind)
        if(!handler){
            throw new Error(`Unknown event ${event.kind}`);
        }
        return handler.handle(event)
    }
}