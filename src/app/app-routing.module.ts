import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderListComponent } from './components/orders-list/orders-list.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { MenuItemCreateComponent } from './components/menuItem-create/menuItem-create.component';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { OrderCreateComponent } from './components/order-create/order-create.components';
import { PrintFormComponent } from './components/print-form/print-form.component';
import { TestPageComponent } from './components/test-page/test-page.component';
import { SigninComponent } from './components/signin/signin.component';
import { LoggedInGuard } from 'ngx-auth-firebaseui';

const routes: Routes = [
  {path:'',redirectTo:'signin', pathMatch: 'full'},
  { path: 'order-create', component: OrderCreateComponent, canActivate: [LoggedInGuard]},  
  { path: 'order-list', component: OrderListComponent, canActivate: [LoggedInGuard]},
  { path: 'order-detail', component: OrderDetailComponent, canActivate: [LoggedInGuard]},
  { path: 'menu-list', component: MenuListComponent, canActivate: [LoggedInGuard]},
  { path: 'menuItem-create', component: MenuItemCreateComponent, canActivate: [LoggedInGuard]},
  { path: 'print-form', component: PrintFormComponent, canActivate: [LoggedInGuard]},
  { path: 'test', component: TestPageComponent},
  { path: 'signin', component: SigninComponent},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }