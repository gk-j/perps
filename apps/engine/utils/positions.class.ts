

export type Position={
  id: string;
  orderId: string;
  userId: number;
  market: string;
  size: number;
  estimatedLiquidationPrice: number;
  averageEntryPrice: number;
  collateralUser: number;
  realizedPnl: number;
  createdAt: Date;
}

export class PositionEntity {
    readonly id!: string;
    readonly orderId!: string;
    readonly userId!: number;
    readonly market!: string;
    size!: number;
    averageEntryPrice!: number;
    collateralUser!: number;
    realizedPnl!: number;
    estimatedLiquidationPrice!: number;
    readonly createdAt!: Date;

    constructor(position: Position) {
        this.id = position.id;
        this.orderId = position.orderId;
        this.userId = position.userId;
        this.market = position.market;
        this.size = position.size;
        this.averageEntryPrice = position.averageEntryPrice;
        this.collateralUser = position.collateralUser;
        this.realizedPnl = position.realizedPnl;
        this.estimatedLiquidationPrice = position.estimatedLiquidationPrice;
        this.createdAt = position.createdAt;
    }

}