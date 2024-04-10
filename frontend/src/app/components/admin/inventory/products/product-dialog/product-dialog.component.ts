import { Component, Inject, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../../../../services/products.service';
import { CategoriesService } from '../../../../../services/categories.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../../../models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../../../../../models/Category';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styles: ``
})
export class ProductDialogComponent implements OnInit {

  private fb = inject(FormBuilder);
  private categoriesServices = inject(CategoriesService);
  private productService = inject(ProductsService);
  public toast = inject(HotToastService);

  public textButton: string = 'Guardar';
  public formTitle: string = 'Nuevo Producto';

  public categories: Category[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: Product) {
    if (data) {
      this.productForm.reset(data);
      this.productForm.controls['category_id'].setValue(data.category.id);
      this.formTitle = 'Edición de producto';
      this.textButton = 'Editar';
    }
  }
  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesServices.getCategories().subscribe((res) => this.categories = res)
  }

  public productForm: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    category_id: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(0), Validators.maxLength(5)]],
    is_active: [true],
    has_stock: [false],
  });

  isValid(field: string) {
    return (
      this.productForm.controls[field].errors &&
      this.productForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.productForm.controls[field]) return null;

    const errors = this.productForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
      }
    }
    return null;
  }

  submitForm() {
    if (this.productForm.invalid) {
      this.toast.error('Todos los campos son obligatorios');
      return;
    }

    if (this.productForm.controls['id'].value) {
      /** Update product */
      this.productService.editProduct(this.productForm.value).subscribe((res) => {
        this.toast.success(`${this.productForm.controls['name'].value} editado correctamemte`);
      })
    } else {
      /** if a new product */
      this.productService.newProduct(this.productForm.value).subscribe((res) => {
        this.toast.success(`${this.productForm.controls['name'].value}, registrado correctamente`)
      })
    }
  }

}
