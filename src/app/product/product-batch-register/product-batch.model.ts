import { ProductItem } from "../product-item/product.item.model";

export interface ProductBatch {
    id : number;
    dateOrder : Date;
    valueTotal : number;
    productItens : ProductItem [];
}