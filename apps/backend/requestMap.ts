type PendingRequest = {
    timeOutId :  NodeJS.Timeout,
    resolve: (value:any) => void
    reject: (reason:any)=>void
}



export const requestMap = new Map<string,PendingRequest>()