import { Category } from "./category.interface";

export interface Subcategory {
    id?: number;
    slug?: string;
    name?: string;
    image?: string;
    category?: Category;
}