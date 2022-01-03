import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Categories } from 'src/app/model/categories';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products: Product[]= [];
  //productList$!: Observable<Product[]>;
  categories$!: Observable<Categories[]>;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute
             , private categoryService: CategoryService
             , private productService: ProductService) { }

  ngOnInit(): void {
    this.categories$= this.categoryService.getCategories();
    //this.productList$= this.productService.getAllProducts();
    this.subscription= this.route.queryParamMap
         .pipe(switchMap(params => this.productService.getAllProducts()
          .pipe(map(products => { 
           return { products, params }
          })
        ) 
      )
    ).subscribe(d => {
       if(d.params.get('category') == null) {
          this.products= d.products;
          return;
       }
       this.products= d.products.filter(y => y.category == d.params.get('category'))    
    });
 }
 ngOnDestroy(): void {
  this.subscription.unsubscribe();
 }
  counter(cn: number){
    return new Array(Math.ceil(cn/2));
  }
}
