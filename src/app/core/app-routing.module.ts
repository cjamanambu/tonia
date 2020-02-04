// @angular
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// modules
import { LoginComponent } from '../modules/auth/login/login.component';
import { RegisterComponent } from '../modules/auth/register/register.component';
import { DashboardComponent } from '../modules/home/dashboard/dashboard.component';

// nebular
import { NbAuthComponent } from '@nebular/auth';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'auth'},
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
