export class ItemMap {
    key!: string | null;
    title?: string;
    price?: number;
    category?: string;
    imageUrl?: string;
    quantity?: number; 
}
export class ShoppingCart {
   key!: string| null;
   dateCreated?: number;
   items?: ItemMap[];
   totalPrice?: number;
   /*set sumOfPrices(unitPrice: number) {
       this.totalPrice= (this.totalPrice)? 
             parseFloat(this.totalPrice.toString()) + parseFloat(unitPrice.toString()) : parseFloat(unitPrice.toString());
   } */
}
