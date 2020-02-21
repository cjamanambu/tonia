import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StaffComponent } from './staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';

const routes: Routes = [
  {
    path: '',
    component: StaffComponent,
    children: [
      {
        path: 'add-staff',
        component: AddStaffComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StaffRoutingModule { }
