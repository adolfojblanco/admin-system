import { Component, inject, OnInit } from '@angular/core';
import { Product } from '../../../../models/Product';
import { ProductsService } from '../../../../services/products.service';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: ``,
})
export class ProductsComponent implements OnInit {
  private productService = inject(ProductsService);
  public products!: Product[];
  private dialog = inject(MatDialog);
  public dataSource = this.products;

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe(res => { this.products = res });
  }

  /** Add new Product */
  newProduct() {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px'
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadProducts()
      }
    })
  }


  /** Edit a product */
  editProduct(product: Product) {
    const dialogRef = this.dialog.open(ProductDialogComponent, {
      width: '450px',
      data: product
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loadProducts()
      }
    })
  }
}
