import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminOrderComponent } from './admin/admin-order/admin-order.component';
import { AdminProductComponent } from './admin/admin-product/admin-product.component';
import { LoginComponent } from './core/login/login.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product/product.component';
import { AdminAuthGuard } from './service/admin-auth-guard.service';
import { AuthGuard } from './service/auth-guard.service';
import { CheckOutComponent } from './shopping/check-out/check-out.component';
import { MyOrderComponent } from './shopping/my-order/my-order.component';
import { OrderSuccessComponent } from './shopping/order-success/order-success.component';
import { ShoppingCartComponent } from './shopping/shopping-cart/shopping-cart.component';

const routes: Routes = [
  { path:'home', component: HomeComponent },
  { path:'product', component: ProductComponent},
  { path:'shopping-cart', component: ShoppingCartComponent },
  { path:'login', component: LoginComponent },

  { path: 'my/orders', component: MyOrderComponent, canActivate: [AuthGuard] },
  { path: 'check-out', component: CheckOutComponent, canActivate: [AuthGuard] },
  { path: 'order-success', component: OrderSuccessComponent, canActivate: [AuthGuard] },
  { path: 'admin/products', component: AdminProductComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path: 'admin/orders', component: AdminOrderComponent, canActivate: [AuthGuard, AdminAuthGuard] },
  { path:'', pathMatch:'full', redirectTo: 'product' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
