import { Component, Inject, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { Category } from '../../../../../models/Category';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategoriesService } from '../../../../../services/categories.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styles: ``,
})
export class CategoryDialogComponent {
  private fb = inject(FormBuilder);
  private categoriesServices = inject(CategoriesService);
  public toast = inject(HotToastService);
  public titleForm = 'Nueva Categoria:';
  public textButton = 'Guardar';


  constructor(@Inject(MAT_DIALOG_DATA) public data: Category, public dialogRef: MatDialogRef<CategoryDialogComponent>) {
    if (data) {
      this.categoryForm.reset(data);
      this.titleForm = 'Edición de categoria';
    }
  }

  public categoryForm: FormGroup = this.fb.group({
    id: [],
    name: ['', [Validators.required]],
    is_active: [true, [Validators.required]],
  });

  submit() {
    if (this.categoryForm.invalid) {
      this.toast.error('Todos los campos son obligatorios');
      return;
    }

    if (this.categoryForm.controls['id'].value) {
      this.categoriesServices
        .editCategory(this.categoryForm.value)
        .subscribe((res) => {
          this.dialogRef.close(this.categoryForm.value)
          this.toast.success(
            `${this.categoryForm.controls['name'].value}, editada correctamente`
          );
        })
    } else {
      this.categoriesServices
        .newCategory(this.categoryForm.value)
        .subscribe((res) => {
          this.toast.success(
            `${this.categoryForm.controls['name'].value}, registrada correctamente`
          );
        });
    }
  }

  isValid(field: string) {
    return (
      this.categoryForm.controls[field].errors &&
      this.categoryForm.controls[field].touched
    );
  }
}
