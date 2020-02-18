import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { SharedModule } from '../@shared';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    NbMenuModule,
    SharedModule,
    DashboardModule
  ],
  declarations: [
    PagesComponent
  ]
})
export class PagesModule { }
