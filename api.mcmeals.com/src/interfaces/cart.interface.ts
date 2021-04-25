import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Cart {
    id?: number;
    quantity?: number;
    
    user?: User;
    product?: Product;
}