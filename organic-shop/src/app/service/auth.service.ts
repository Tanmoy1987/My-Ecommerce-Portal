import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
//import * as firebase from 'firebase/auth' 
import * as firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.default.User | null>;
  appUser$: Observable<AppUser | null>;

  constructor(private db: AngularFireDatabase, private afAuth: AngularFireAuth) { 
      this.user$ = this.afAuth.authState;
      this.appUser$ = this.user$.pipe(switchMap(user => this.get(user)));
  }
  
  login(){
    return this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }

  get(user: firebase.default.User | null): Observable<AppUser | null> {
      return this.db.object<AppUser | null>('/user/'+ user?.uid).valueChanges();
  }

  create(user: firebase.default.User) {
    //this.userListRef.push(user);
    this.db.object('/user/' + user.uid).set({
      email: user.email || '',
      name: user.displayName || '',
      isAdmin: false
   });
  }
  /*findUserByEmail(fbUser: firebase.default.User): Observable<User[]>  {
      return this.db.list<User>("/user", ref => ref.orderByChild('email').equalTo(fbUser.email)).valueChanges();
  }*/

  
}
