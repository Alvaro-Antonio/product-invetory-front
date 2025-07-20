import { Product } from "../product.model";

export interface ProductItem {
  id: number;
  name: string;
  price: number;
  amount : number;
  purchasePrice : number;
  sellingPrice : number;
  product : Product;
  amountItemProduct: AmountItemProduct;
}

export interface AmountItemProduct {
    id: number;
    amountInitial: number;
    amountFinal: number;
}