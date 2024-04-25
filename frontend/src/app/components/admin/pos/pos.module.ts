import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PosRoutingModule } from './pos-routing.module';
import { PosComponent } from './pos.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TablesComponent } from './tables/tables.component';
import { RoomsComponent } from './rooms/rooms.component';
import { DetailsComponent } from './tables/details/details.component';


@NgModule({
  declarations: [
    PosComponent,
    TablesComponent,
    RoomsComponent,
    DetailsComponent
  ],
  imports: [
    CommonModule,
    PosRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class PosModule { }
