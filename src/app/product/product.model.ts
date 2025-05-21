import { Category } from "../category/models/category.model";

export interface Product{
    id: number
    name: string;
    description: string; 
    image?: File;
    categories : Category[]
}

export interface CreateProductDTO{
    name: string;
    description: string; 
    image?: File
    categories : Category[]
}