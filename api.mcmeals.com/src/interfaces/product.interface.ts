import { Cart } from "./cart.interface";
import { Category } from "./category.interface";
import { Subcategory } from "./subcategory.interface";
import { Comment } from "./comment.interface";

export interface Product {
    id?: number;
    slug?: string;
    name?: string;
    image?: string;
    description?: string;
    weight?: number;
    price?: number;
    type?: string;
    energy?: number;
    fats?: number;
    saturated?: number;
    carbohydrates?: number;
    sugars?: number;
    fiber?: number;
    proteins?: number;
    salt?: number;

    categories?: Category[]
    subcategories?: Subcategory[];
    cart_users?: Cart[];
    comments?: Comment[];
}