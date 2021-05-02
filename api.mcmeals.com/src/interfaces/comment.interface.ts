import { Product } from "./product.interface";
import { User } from "./user.interface";

export interface Comment {
    id?: number;
    title?: string;
    body?: string;
    
    user?: User;
    product?: Product;
}