import { Product } from "./product.interface";

export enum Side {
    FIRST = 'first',
    SECOND = 'second',
    THIRD = 'third'
}

export interface Ingredient {
    id?: number;
    name?: string;
    description?: string;
    side?: Side;
    
    products?: Product[];
}