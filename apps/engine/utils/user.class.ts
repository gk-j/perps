import type { OrderEntity } from "../state";



export class User {
    userId:string;
    balance:number=0;
    lockedBalance: number =0;
    openOrders=new Map<string,OrderEntity>()

    constructor(userId:string){
        this.userId = userId
    }

    
}