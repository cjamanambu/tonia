import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import {
  NbCardModule,
  NbInputModule,
  NbButtonModule
} from '@nebular/theme';

import { StaffComponent } from './staff.component';
import { AddStaffComponent } from './add-staff/add-staff.component';
import { StaffRoutingModule } from './staff-routing.module';

const IMPORTS = [
  StaffRoutingModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  FormsModule
];

const DECLARATIONS = [
  StaffComponent,
  AddStaffComponent
];

@NgModule({
  imports: [...IMPORTS ],
  declarations: [ ...DECLARATIONS ]
})
export class StaffModule { }
