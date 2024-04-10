import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryComponent } from './inventory.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductsComponent } from './products/products.component';
import { MaterialModule } from '../../shared/material/material.module';
import { CategoryDialogComponent } from './categories/category-dialog/category-dialog.component';
import { ProductDialogComponent } from './products/product-dialog/product-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    InventoryComponent,
    CategoriesComponent,
    ProductsComponent,
    CategoryDialogComponent,
    ProductDialogComponent,
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class InventoryModule {}
