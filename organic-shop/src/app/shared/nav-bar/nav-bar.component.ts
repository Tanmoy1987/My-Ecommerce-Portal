import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Observable, Subscription } from 'rxjs';
import { AppUser } from 'src/app/model/user';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/service/shopping-cart.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user$!: Observable<AppUser | null>;

  constructor(private auth: AuthService
            , public cartService: ShoppingCartService
            , private router: Router) { 
    this.user$= this.auth.appUser$;
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
