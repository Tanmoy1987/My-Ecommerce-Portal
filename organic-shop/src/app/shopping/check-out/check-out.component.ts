import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppComponent } from 'src/app/app.component';
import { Order } from 'src/app/model/order';
import { OrderService } from 'src/app/service/order.service';
import { Shipping } from '../../model/shipping';
import { ShoppingCart } from '../../model/shoppingCart';
import { ShoppingCartService } from '../../service/shopping-cart.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent  {
  cart$?: Observable<ShoppingCart>
  shipping: Shipping = { };

  constructor(private router: Router
            , private orderService: OrderService
            , private cartService: ShoppingCartService) {
    this.cart$= this.cartService.getCart();
  }
  getCartTotalQuantity(cart: ShoppingCart): number{
    let qty: number=0;
    if(cart.items)
      cart.items.forEach(d=> qty+= d.quantity? d.quantity: 0);
    return qty;
  }
  async saveOrder(shipInfo: Shipping, cart: ShoppingCart){
    if(!shipInfo.addressLine2) 
       shipInfo.addressLine2= '';

    let order: Order= {
      userId: AppComponent._userKey??'XX',
      datePlaced: new Date().getTime(),
      shipping: shipInfo,
      cart: cart.items
    }

    let key= await this.orderService.createOrder(order);
    if(key) {
      this.cartService.removeCart();
      this.router.navigate(['/order-success', key])     
    }
  }
}
