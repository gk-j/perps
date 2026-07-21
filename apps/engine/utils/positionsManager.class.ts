import type { Position } from "./positions.class";



export class PositonsManager{
    private positions:Map<string,Position>

    constructor(Initialposition:Map<string,Position>= new Map()){
        this.positions = Initialposition
    }
}