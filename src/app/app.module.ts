// @angular
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// app
import { AppComponent } from './app.component';

// core
import { AppRoutingModule } from './core/app-routing.module';
import { AngularMaterialModule } from './core/angular-material.module';

// modules
import { AuthModule } from './modules/auth/auth.module';
import { HomeModule } from './modules/home/home.module';

// @nebular
import { NbThemeModule, NbLayoutModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    HttpClientModule,
    HomeModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://localhost:5000/api/v1',
          login: {
            alwaysFail: false,
            endpoint: '/auth/login',
            method: 'post',
            redirect: {
              success: '/dashboard',
              failure: null
            }
          },
          token: {
            class: NbAuthJWTToken,
          }
        }),
      ],
      forms: {},
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
