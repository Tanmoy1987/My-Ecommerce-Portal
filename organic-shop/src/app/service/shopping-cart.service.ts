import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, of } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from '../model/product';
import { ItemMap, ShoppingCart } from '../model/shoppingCart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  private totalQty$!: Observable<number>;

  constructor(private db: AngularFireDatabase) {
    this.totalQty$= this.getCartTotalQuantity();
  }
  get totalQuantity(): Observable<number> {
    return this.totalQty$;
  }

  getCartId(){
    return localStorage.getItem('cartId');
  }
  getCart(): Observable<ShoppingCart> {
     return this.db.object(`/shopping-cart/${this.getCartId()}`).snapshotChanges()
          .pipe(map(d => {
            let itemArray= new Array<ItemMap>();
              d.payload.child('items').forEach(item => {
                itemArray.push({
                  key: item.key,
                  title: item.child('title').val(),
                  price: item.child('price').val(),
                  category: item.child('category').val(),
                  imageUrl: item.child('imageUrl').val(),
                  quantity: item.child('quantity').val()
                })
              });
              return {
                key: d.key,
                dateCreated: d.payload.child('dateCreated').val(),
                items: itemArray,
                totalPrice: d.payload.child('totalPrice').val()
          }
     })
   );
  }
  getCartItem(d: Product) {
    return this.db.object(`/shopping-cart/${this.getCartId()}/items/${d.key}`)
               .snapshotChanges()
               .pipe(map(ob => {return {
                    key: ob.key, 
                    title: ob.payload.child('title').val(),
                    price: ob.payload.child('price').val(),
                    category: ob.payload.child('category').val(),
                    imageUrl: ob.payload.child('imageUrl').val(),
                    quantity: ob.payload.child('quantity').val()} 
          }))
          .pipe(take(1))
          .toPromise();
  }
  getCartItemQuantity() {
    return this.db.list(`/shopping-cart/${this.getCartId()}/items`).snapshotChanges()
             .pipe(map(li=> li.map(d => {
               return new Map([
                 [d.key??'', +d.payload.child('quantity').val()]
               ]);
          })
      ))
  }
  getCartTotalQuantity() {
    return this.db.object(`/shopping-cart/${this.getCartId()}`).snapshotChanges()
          .pipe(map(d=> { 
            let quantity= 0;
            d.payload.child('items').forEach(item => {
              quantity += item.child('quantity').val();
            })
           return quantity;
        }
    ))
  }
  getCartTotalPrice() {
    return this.db.object(`/shopping-cart/${this.getCartId()}`)
               .snapshotChanges()
               .pipe(map(ob => ob.payload.child('totalPrice').val()))
               .pipe(take(1))
               .toPromise();
  }

  async createCart() {
    const result= await this.db.list('/shopping-cart').push({ dateCreated: new Date().getTime() });
    if(result.key) localStorage.setItem('cartId', result.key);
    this.totalQty$= this.getCartTotalQuantity();
  }

  async addCart(d: Product) {
    let price: any= await this.getCartTotalPrice();
    price= this.calculatePrice(price, d.price);
    this.db
      .object(`/shopping-cart/${this.getCartId()}`)
      .update({ totalPrice: price });

    this.db
      .object(`/shopping-cart/${this.getCartId()}/items/${d.key}`)
      .set({ 
        title: d.title,
        price: d.price,
        category: d.category,
        imageUrl: d.imageUrl,
        quantity: 1
    });
  }
  async updateCart(changeQTy: number, item: ItemMap) {
    let qTY:number= 0;
    let price: any= await this.getCartTotalPrice();
    if(changeQTy==1) {
        price = this.calculatePrice(price, item.price);
    }
    else{
        price = this.calculatePrice(price, item.price? -item.price: 0);
    }
    qTY= (item.quantity? item.quantity: 0) + changeQTy;

    this.db
        .object(`/shopping-cart/${this.getCartId()}`)
        .update({ totalPrice: price });

    if(qTY==0) {
      this.removeFromCart(item.key);
      return;
    }
    this.db
        .object(`/shopping-cart/${this.getCartId()}/items/${item.key}`)
        .update({ quantity: qTY });
    
  }
  removeFromCart(key: string| null) {
    this.db
        .object(`/shopping-cart/${this.getCartId()}/items/${key}`)
        .remove();
  }

  calculatePrice(currentPrice?: number| null, unitPrice?: number){
    return (parseFloat((currentPrice== null? 0: currentPrice).toString()) + parseFloat((unitPrice? unitPrice: 0).toString())).toFixed(2);
  }
}
