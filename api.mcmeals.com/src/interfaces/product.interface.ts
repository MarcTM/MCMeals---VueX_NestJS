import { Category } from "./category.interface";
import { Subcategory } from "./subcategory.interface";

export interface Product {
    id?: number;
    slug?: string;
    name?: string;
    image?: string;
    description?: string;
    price?: number;
    type?: string;
    kcals?: number;
    fats?: number;
    carbohydrates?: number;
    proteins?: number;

    categories?: Category[]
    subcategories?: Subcategory[];
}