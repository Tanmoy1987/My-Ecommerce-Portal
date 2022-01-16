import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Order } from '../model/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase) { }

  async createOrder(order: Order) {
    const result= await this.db.list('/orders').push({
      userId: order.userId,
      datePlaced: order.datePlaced,
      shipping: order.shipping
    });
    order.cart?.forEach(ct => this.db.object(`/orders/${result.key}/items/${ct.key}`).set({
      product: {
        title: ct.title,
        price: ct.price,
        imageUrl: ct.imageUrl
      },
      quantity: ct.quantity,
      totalPrice: (ct.price && ct.quantity) ? ct.price*ct.quantity: 0
     })
    );  
    return result.key;
  }
}
