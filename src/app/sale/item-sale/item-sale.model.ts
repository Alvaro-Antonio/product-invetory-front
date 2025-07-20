import { ProductItem } from "../../product/product-item/product.item.model";

export interface ItemSale {

    id: number;
    
    productItem: ProductItem;

    quantity: number;

    unitPrice: number;

    totalPrice: number;

    discount: number;
}
