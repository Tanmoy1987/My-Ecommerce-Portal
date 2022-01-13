import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from '../../model/product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: any= {};
  @Input('displayFooter') displayFooter?: boolean;
  @Input('quantity') quantity?: number;

  @Output('addToCart') addToCart= new EventEmitter<any>();
  @Output('updateQTy') updateQTy= new EventEmitter<any>();


  constructor() { }

  add(p: any) {
    this.addToCart.emit(p);
  }
  update(obj: any) {
    this.updateQTy.emit(obj);
  }
}
