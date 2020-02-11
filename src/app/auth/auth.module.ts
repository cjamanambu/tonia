// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NbAuthModule } from '@nebular/auth';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from '../app-routing.module';
import {
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
} from '@nebular/theme';

const COMPONENTS = [
  LoginComponent,
  RegisterComponent
];

const MODULES = [
  FormsModule,
  NbAuthModule,
  AppRoutingModule,
  NbAlertModule,
  NbButtonModule,
  NbCheckboxModule,
  NbInputModule
];
@NgModule({
  declarations: [...COMPONENTS ],
  imports: [ CommonModule, ...MODULES ],
  exports: [...COMPONENTS ]
})
export class AuthModule { }
