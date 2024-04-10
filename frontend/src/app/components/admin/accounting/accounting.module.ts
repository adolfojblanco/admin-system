import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { AcountingDialogComponent } from './acounting-dialog/acounting-dialog.component';
import { SupplierDialogComponent } from './supplier-dialog/supplier-dialog.component';
import { MaterialModule } from '../../shared/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AcountingDialogComponent,
    SupplierDialogComponent
  ],
  imports: [
    CommonModule,
    AccountingRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ]
})
export class AccountingModule { }
