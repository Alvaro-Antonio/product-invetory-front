import { ProductItem } from "../product-item/product.item.model";

export interface ProductBatch {
    id : number;
    orderNumber : string;
    dateOrder : Date;
    valueTotal : number;
    productItens : ProductItem [];
}