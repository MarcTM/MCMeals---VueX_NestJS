import { Category } from "./category.interface";
import { Product } from "./product.interface";

export interface Subcategory {
    id?: number;
    slug?: string;
    name?: string;
    image?: string;

    category?: Category;
    products?: Product[];
}