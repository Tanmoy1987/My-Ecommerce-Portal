import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFireDatabase } from '@angular/fire/compat/database';
//import * as firebase from 'firebase/auth' 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 public static _userKey?: string | null;
 constructor(private auth: AuthService, private router: Router){

  let returnURL = localStorage.getItem('returnUrl');
  localStorage.removeItem('returnUrl');

  this.auth.user$.pipe(switchMap(fu => this.auth.get(fu)
        .pipe(map(user => {
            return { fu, user }
      })
    )
  )
 ).subscribe(obj => {
      if(!obj.fu) return;
      AppComponent._userKey= obj.fu?.uid;
      if(!obj.user) this.auth.create(obj.fu);
      if(returnURL) this.router.navigateByUrl(returnURL);
    });

 }
}
