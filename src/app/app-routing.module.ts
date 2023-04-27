import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { AboutComponent } from './core/about/about.component';
import { E404Component } from './core/e404/e404.component';
import { LoginComponent } from './user/login/login.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserCreateComponent } from './user/user-create/user-create.component';
import { UserChangeComponent } from './user/user-change/user-change.component';
import { VendorListComponent } from './vendor/vendor-list/vendor-list.component';
import { VendorDetailComponent } from './vendor/vendor-detail/vendor-detail.component';
import { VendorChangeComponent } from './vendor/vendor-change/vendor-change.component';
import { VendorCreateComponent } from './vendor/vendor-create/vendor-create.component';
import { RequestListComponent } from './request/request-list/request-list.component';
import { ProductListComponent } from './product/product-list/product-list.component';
import { ProductDetailComponent } from './product/product-detail/product-detail.component';
import { ProductCreateComponent } from './product/product-create/product-create.component';
import { ProductChangeComponent } from './product/product-change/product-change.component';
const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "about", component: AboutComponent },
  { path: "user/login", component: LoginComponent },
  { path: "user/list", component: UserListComponent },
  { path: "user/detail/:id", component: UserDetailComponent },
  { path: "user/create", component: UserCreateComponent },
  { path: "user/change/:id", component: UserChangeComponent },
  { path: "vendor/list", component: VendorListComponent },
  { path: "vendor/detail/:id", component: VendorDetailComponent },
  { path: "vendor/change/:id", component: VendorChangeComponent },
  { path: "vendor/create", component: VendorCreateComponent },
  { path: "request/list", component: RequestListComponent },
  { path: "product/list", component: ProductListComponent },
  { path: "product/detail/:id", component: ProductDetailComponent },
  { path: "product/create", component: ProductCreateComponent },
  { path: "product/change/:id", component: ProductChangeComponent },
  { path: "**", component: E404Component }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
