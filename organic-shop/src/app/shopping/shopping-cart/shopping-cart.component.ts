import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ItemMap, ShoppingCart } from 'src/app/model/shoppingCart';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  cart$?: Observable<ShoppingCart>
  cartTotalQuantity$!: Observable<number>;

  constructor(private router: Router
            , private cartService: ShoppingCartService) {
    this.cart$= this.cartService.getCart();
    this.cartTotalQuantity$= this.cartService.getCartTotalQuantity();
  }

  ngOnInit(): void {
  }

  async updateQuantity(obj: any){
    let item:ItemMap= obj.product;
    if(item)
      await this.cartService.updateCart(obj.change, item);
  }
  clearCart(){
    this.cartService.clearCart();
  }
  navigate(){
    this.router.navigateByUrl('/check-out');
  }

}
