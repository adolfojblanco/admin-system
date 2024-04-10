import { Component, OnInit, inject } from '@angular/core';
import { CategoriesService } from '../../../../services/categories.service';
import { Category } from '../../../../models/Category';
import { MatDialog } from '@angular/material/dialog';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styles: ``,
})
export class CategoriesComponent implements OnInit {
  private categoriesServices = inject(CategoriesService);
  private dialog = inject(MatDialog);
  public categories!: Category[];

  public displayedColumns: string[] = ['name', 'slug', 'is_active', 'actions'];

  public dataSource = this.categories;

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoriesServices.getCategories().subscribe((res) => {
      this.dataSource = res;
    });
  }

  /** Add a new Category */
  newCategory() {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '450px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategories();
      }
    });
  }

  /** Edit a Category */
  editCategory(category: Category) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '450px',
      data: category,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCategories();
      }
    });
  }
}
