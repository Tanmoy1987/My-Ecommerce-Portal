import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate()  {
    return this.auth.appUser$.pipe(map(d => {
      if(d && d.isAdmin) return true;
      this.router.navigateByUrl("/");
      return false;
    }));
  }
}
