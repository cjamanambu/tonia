// @angular
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// components
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class HomeModule { }
