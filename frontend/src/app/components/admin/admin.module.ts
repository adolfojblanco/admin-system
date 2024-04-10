import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from '../shared/material/material.module';
import { AccountingComponent } from './accounting/accounting.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DesktopComponent } from './desktop/desktop.component';
import { TaskDialogComponent } from './desktop/task-dialog/task-dialog.component';

@NgModule({
  declarations: [AdminComponent, AccountingComponent, DesktopComponent, TaskDialogComponent],
  imports: [CommonModule, AdminRoutingModule, MaterialModule, ReactiveFormsModule],
})
export class AdminModule { }
