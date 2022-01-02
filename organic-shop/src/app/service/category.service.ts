import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Categories } from '../model/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }

  getCategories() {
    return this.db.list('/categories').snapshotChanges()
        .pipe(map(cat => { 
          return cat.map(d => {
            let categories = new Categories();
            categories.key = d.key;
            categories.name = d.payload.child('name').val();
            return categories;
        }) 
      }))
  }
}
