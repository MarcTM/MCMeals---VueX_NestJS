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
    price?: number;
    energy?: number;
    carbohydrates?: number;
    proteins?: number;
    fats?: number;
    fiber?: number;
    side?: Side;
    
    products?: Product[];
}