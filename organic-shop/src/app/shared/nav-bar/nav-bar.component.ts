import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { Observable } from 'rxjs';
import { AppUser } from 'src/app/model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  user$!: Observable<AppUser | null>;
  constructor(private auth: AuthService, private router: Router) { 
    this.user$ = this.auth.appUser$;
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
