import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Categories } from '../../model/categories';
import { Product } from '../../model/product';
import { CategoryService } from '../../service/category.service';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  categories$ : Observable<Categories[]> | undefined;
  product: Product = { category: 'selCategory' };
  isSubmitted: boolean= false;
  subscription!: Subscription;

  constructor(private router: Router
            , private route: ActivatedRoute
            , private categoryService: CategoryService
            , private productService: ProductService) { }

  ngOnInit(): void {
    this.categories$= this.categoryService.getCategories();
    this.subscription = this.route.params.pipe
                                  (switchMap(param => {
                                    if(param.key)
                                       return this.productService.getProductByKey(param.key);
                                    return of(null);
                                  }
                                )).subscribe(p => {
                                    if(p) this.product = p; 
                              });
  }
  async saveProduct(formData: any) {
    if(!this.product.key) {
      await this.productService.createProduct(formData).then(key => {
        if(key) this.navigateToPrev(true)
      });
      return;
    }
    this.productService.updateProduct(this.product).then(y => this.navigateToPrev(true))    
  }
  navigateToPrev(save: boolean){
    let timeout: number= 1;
    if(save) {
      this.isSubmitted = true;
      timeout= 2000;
    }
    setTimeout(() => {
        this.router.navigateByUrl('/admin/products');
    }, timeout);
  }
  deleteProduct(product: any) {
    this.productService.deleteProduct(product?.key);
    this.navigateToPrev(false);
  }
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
