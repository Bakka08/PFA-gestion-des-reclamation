import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { SignupComponent } from './Component/signup/signup.component';
import { AfterloginAdminComponent } from './Component/afterlogin-admin/afterlogin-admin.component';
import { AfterloginUserComponent } from './Component/afterlogin-user/afterlogin-user.component';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'after-login-user', component: AfterloginUserComponent },
  { path: 'after-login-admin', component: AfterloginAdminComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
