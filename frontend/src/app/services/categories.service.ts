import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly urlEndPoint: string = `${environment.apiUrl}/inventory/categories`;
  private http = inject(HttpClient);
  constructor() {}

  /** Get all categories */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.urlEndPoint}/`);
  }

  /** Create a new category */
  newCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.urlEndPoint}/`, category);
  }

  /** Edit category */
  editCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.urlEndPoint}/${category.id}/`, category);
  }
}
