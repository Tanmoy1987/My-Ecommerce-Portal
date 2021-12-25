import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { ActivatedRoute } from '@angular/router';
//import * as firebase from 'firebase/compat/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 
  constructor(private auth: AuthService, private route: ActivatedRoute) { }

  login() {
     let returnURL = this.route.snapshot.queryParamMap.get("returnUrl") ?? "/";
     localStorage.setItem('returnUrl', returnURL);     
     this.auth.login();
  }

}
