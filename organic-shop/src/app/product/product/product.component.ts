import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Categories } from 'src/app/model/categories';
import { Product } from 'src/app/model/product';
import { ItemMap } from 'src/app/model/shoppingCart';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  products$!: Observable<Product[]>;
  categories$!: Observable<Categories[]>;
  ob$?: Observable<Map<string, number>[]>;

  constructor(private route: ActivatedRoute
             , private categoryService: CategoryService
             , private productService: ProductService
             , private cartService: ShoppingCartService) { }

   ngOnInit(): void {
    this.categories$= this.categoryService.getCategories();   
    this.products$=this.route.queryParamMap
         .pipe(switchMap(params => 
              this.productService.getProductByCategory(params.get('category'))
    ));
    if(this.cartService.getCartId() != null) this.ob$= this.cartService.getCartItemQuantity();  

    //this.cartSubscription= this.cartService.getCart().subscribe(cart => this.cart= cart);
    //this.el$.subscribe(val=> console.log(val));
    /*this.subscription= this.route.queryParamMap
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
    });*/
 }

 async addToCart(d: any) {
    if(this.cartService.getCartId()== null)
        await this.cartService.createCart();

    if(!this.ob$)
      this.ob$= this.cartService.getCartItemQuantity();

    await this.cartService.addCart(d);
  }

  async updateQuantity(obj: any) {
    let item:ItemMap= await this.cartService.getCartItem(obj.product);
    if(item)
      await this.cartService.updateCart(obj.change, item);
  }

  getqTY(el?: Map<string, number>[]| null, key?: string| null ) {
    if(key== null || key==undefined || el==undefined) return 0;
    for(let i=0; i< el?.length; i++) {
      if(el[i].has(key))
        return el[i].get(key);
      continue;
    }
    return 0;
  }
  counter(cn: number){
    return new Array(Math.ceil(cn/2));
  }
  ngOnDestroy(): void {
    //this.cartSubscription.unsubscribe();
  }
}
