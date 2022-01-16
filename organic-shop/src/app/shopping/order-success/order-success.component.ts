import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderKey?: string| null;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderKey= this.route.snapshot.paramMap.get('key')
  }

}
