import { Shipping } from "./shipping";
import { ItemMap } from "./shoppingCart";

export class Order {
    datePlaced?: number;
    userId?: string;
    shipping?: Shipping;
    cart?: ItemMap[];
}