import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  getAllProducts(): Observable<Product[]> {
    return this.db.list('/product').snapshotChanges()
               .pipe(map(sn => sn.map(d => {
                 let p: Product= {
                   key: d.key,
                   title: d.payload.child('title').val(),
                   price: d.payload.child('price').val(),
                   category: d.payload.child('category').val(),
                   imageUrl: d.payload.child('imageUrl').val()
                 }
                 return p;
              })
          ))
  }
  getProductByKey(key: string ): Observable<Product> {
    return this.db.object('/product/'+ key).snapshotChanges()
             .pipe(map(d => {
                return {
                  key: d.key,
                  title: d.payload.child('title').val(),
                  price: d.payload.child('price').val(),
                  category: d.payload.child('category').val(),
                  imageUrl: d.payload.child('imageUrl').val()
              }
          }));
  }
  async createProduct(product: Product){
    const ref = await this.db.list('/product').push(product);
    return ref.key;
  }

  updateProduct(product: Product){
    return this.db.object('/product/'+ product.key).update({
      title: product.title,
      price: product.price,
      category: product.category,
      imageUrl: product.imageUrl
    });
  }

  deleteProduct(key?: string) {
    return this.db.object('/product/' + key).remove();
  }
}
