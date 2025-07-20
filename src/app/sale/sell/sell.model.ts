import { Customer } from "../../customer/customer.model";
import { ItemSale } from "../item-sale/item-sale.model";
import { PaymentMethod } from "./sell.paymente.enum";

export interface Sell {

    id: number;

    date: Date;
   
    total: number;
  
    paymentMethod: PaymentMethod;

    customer: Customer; // Assuming customer is a separate entity

    //userId: number; // Assuming user is a separate entity

    items: ItemSale[]; // This should be replaced with the actual type of items sold, e.g., ItemSale[]
}