import { ORDER_TYPE, SIDE, type createOrderPayloadSchema } from "@repo/commontypes";
import {z} from "zod"
import { PositonsManager } from "./utils/positionsManager.class";
import { UserManager } from "./utils/userManager.class";
import type { Position } from "./utils/positions.class";

export let POSITIONMANAGER = new PositonsManager()
export let USERMANAGER = new UserManager()


export function initializeAppState(
  positionsManager: PositonsManager,
  userManager: UserManager,
) {
  POSITIONMANAGER = positionsManager;
  USERMANAGER = userManager;
}



type PriceLevel = {
    price:number,
    availableQty:number,
    orders:OrderEntity[]
}


export class OrderEntity{
    id:string;
    side:SIDE;
    price:number;
    qty:number;
    filledQty:number;
    market:string;
    userId:string;
    orderType:ORDER_TYPE;
    leverage:number;
    timestamp:number;

    constructor(payload:z.infer<typeof createOrderPayloadSchema.shape.payload>,userId:string){
        this.id=payload.id,
        this.side=payload.side;
        this.price=payload.price;
        this.qty=payload.qty;
        this.filledQty=0
        this.market=payload.market;
        this.userId=userId;
        this.orderType=payload.orderType;
        this.leverage=payload.leverage;
        this.timestamp=Date.now();
    }

    getAvailableQty(){
        return this.qty-this.filledQty
    }
    isOrderFullyFilled() {
        return this.qty === this.filledQty;
    }
    isMarketOrder() {
        return this.orderType === ORDER_TYPE.MARKET;
    }
    isLimitOrder() {
        return this.orderType === ORDER_TYPE.LIMIT;
    }

}


export class OrderBook {
    market:string;   
    bids:PriceLevel[] = [];
    asks:PriceLevel[] = [];
    indexPrice:number = 0;
    lastTradedPrice:number = 0
    
    constructor(market:string){
        this.market = market
    }

    updateIndexPrice(indexPrice: number) {
        this.indexPrice = indexPrice;
    }

    getIndexPrice() {
        return this.indexPrice;
    }
    getBestBidPrice() {
        const priceLevel = this.bids[0];
        if (!priceLevel) throw new Error("Orderbook is empty");
        return priceLevel.price;
    }

    getBestAskPrice() {
        const priceLevel = this.asks[0];
        if (!priceLevel) throw new Error("Orderbook is empty");
        return priceLevel.price;
    }
    
    getMarketPrice() {
        return (this.getBestAskPrice() + this.getBestBidPrice()) / 2;
    }

    setIndexPrice(indexPrice: number) {
        if (indexPrice < 0) throw new Error("Invalid index price");
        this.indexPrice = indexPrice;
    }

    setLastTradedPrice(price: number) {
        if (price <= 0) throw new Error("Invalid last traded price");;
        this.lastTradedPrice = price;
    }
    getLastTradedPriceForFunding(): number {
        if (this.lastTradedPrice > 0) return this.lastTradedPrice;
        if (this.bids.length > 0 && this.asks.length > 0) {
            return this.getMarketPrice();
        }
        return this.indexPrice;
    }
    addOrder(order:OrderEntity):{
        side:"bids"|"asks",
        price:number,
        qty:number
    }{
        const availableQty = order.getAvailableQty()
        const bookSide = order.side === SIDE.LONG ? this.bids : this.asks
        const side = order.side === "LONG" ? "bids" : "asks"

        const existinglevel = bookSide.find((level)=>level.price===order.price)

        if(existinglevel){
            existinglevel.availableQty += availableQty;
            existinglevel.orders.push(order);
            return { side, price: order.price, qty: existinglevel.availableQty };
        }
        //no entry of pricelevel for this price exist in orderbook.asks or bids so have to create one
        const priceLevel :PriceLevel={
            price:order.price,
            availableQty:availableQty,
            orders:[order]
        }
        // have to add above new price level to bids or asks as it is not present (the orderbook)

        if(order.side===SIDE.LONG){
            const index = this.bids.findIndex((level)=>order.price>level.price)
            // no index found with new order price greater than all level prices
            if(index==-1){
                this.bids.push(priceLevel);
            }else{
                this.bids.splice(index,0,priceLevel)
            }
        }else{
            const index = this.asks.findIndex((level)=>order.price<level.price)
            if(index==-1){
                this.asks.push(priceLevel)
            }else{
                this.asks.splice(index,0,priceLevel)
            }
        }

        return { side, price: order.price, qty: availableQty };
    }

    //used for cancelling the limit orders(which are present in bids or asks)
    removeOrderById(orderId:string,userId:string):{
        side:"bids"|"asks",
        price:number,
        qty:number,
        cancelledQty:number
    }{
        for (const side of ["bids","asks"] as const){
            const book = side === "bids" ? this.bids:this.asks

            for (let i=0;i<book.length;i++){
                const level = book[i];
                if (!level) continue;
                const orderIndex = level.orders.findIndex((order)=>order.id===orderId)
                if (orderIndex === -1) continue;
                const order = level.orders[orderIndex]
                if (!order) continue;

                if (order.userId !== userId) {
                    throw new Error("UnauthorizedOrderError");
                }
                if(!order.isLimitOrder() || order.getAvailableQty()<=0){
                    throw new Error("Order Cannot be Cancelled")
                }

                const cancelledQty = order.getAvailableQty()
                level.availableQty -= cancelledQty;
                level.orders.splice(orderIndex, 1);

                if (level.orders.length === 0) {
                    book.splice(i, 1);
                    return { side, price: level.price, qty: 0, cancelledQty };
                }

                return {side,price:level.price,qty:level.availableQty,cancelledQty}
            }
        }

        throw new Error(`order not found ${orderId}`)
    }

} 
