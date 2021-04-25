import { Cart } from "./cart.interface";

export enum UserRole {
    ADMIN = 'admin',
    USER = 'user'
}

export interface User {
    id?: number;
    name?: string;
    surname?: string;
    email?: string;
    password?: string;
    
    role?: UserRole;
    cart_products?: Cart[];
}