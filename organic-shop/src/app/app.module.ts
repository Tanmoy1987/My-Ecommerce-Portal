import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { environment } from 'src/environments/environment';
/** Firebase Modules**/
import { AngularFireModule  } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
/** Firebase Modules**/
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
/** components**/
import { AppComponent } from './app.component';
import { NavBarComponent } from './shared/nav-bar/nav-bar.component';
import { ProductComponent } from './product/product/product.component';
import { HomeComponent } from './home/home.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';
import { LoginComponent } from './core/login/login.component';
import { CheckOutComponent } from './shopping/check-out/check-out.component';
import { MyOrderComponent } from './shopping/my-order/my-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { OrderSuccessComponent } from './shopping/order-success/order-success.component';
/** components**/
/**Services**/
import { AuthService } from './service/auth.service';
import { AuthGuard } from './service/auth-guard.service';
import { AdminAuthGuard } from './service/admin-auth-guard.service';

/**Services**/

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    ProductComponent,
    HomeComponent,
    ShoppingCartComponent,
    LoginComponent,
    CheckOutComponent,
    MyOrderComponent,
    AdminProductComponent,
    AdminOrderComponent,
    OrderSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    NgbModule
  ],
  providers: [AuthService,
  AuthGuard,
  AdminAuthGuard
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
