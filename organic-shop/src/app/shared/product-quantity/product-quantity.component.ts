import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
  @Input('product') product: any= {};
  @Input('quantity') quantity?: number;

  @Output('updateQTy') updateQTy= new EventEmitter<{product: any, change: number}>();


  constructor() { }

  update(p: any, qty: number) {
    this.updateQTy.emit({product: p, change: qty});
  }
}
