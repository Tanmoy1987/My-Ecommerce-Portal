import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { of, from } from 'rxjs';
import { delay, map, mergeMap, switchMap } from 'rxjs/operators';
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

  this.auth.user$.pipe(switchMap(user => this.auth.get(user)
        .pipe(map(appUser => {
            return { user, appUser }
      })
    )
  )
  ).subscribe((obj) => {
      if(!obj.user) return;
      AppComponent._userKey= obj.user?.uid;
      if(!obj.appUser) this.auth.create(obj.user);
      if(returnURL) this.router.navigateByUrl(returnURL);
   });

   //this.name$.pipe(mergeMap(arr => this.dummyApi(arr))).subscribe(d => console.log(d));
 }
 /*dummyApi= function(ch: string) {
   return of(`API response for the character ${ch}`).pipe(delay(1000));
 };
 name$= from(['Tanmoy','Sayanti','Laxmi','Rakesh','Somnath']);*/

}
