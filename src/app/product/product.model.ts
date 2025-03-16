import { Category } from "../category/models/category.model";

export interface Product{
    id: number;
    name: string;
    description: string; 
    categories : Category[]
}