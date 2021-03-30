import { Subcategory } from "./subcategory.interface";

export interface Category {
    id?: number;
    slug?: string;
    name?: string;
    image?: string;
    subcategories: Subcategory[];
}