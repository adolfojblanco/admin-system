import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Product } from '../models/Product';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly urlEndPoint: string = `${environment.apiUrl}/inventory`;
  private http = inject(HttpClient);

  constructor() { }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.urlEndPoint}/products/`);
  }

  newProduct(product: Product): Observable<Product> {
    console.log(product)
    return this.http.post<Product>(`${this.urlEndPoint}/products/`, product);
  }

  editProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.urlEndPoint}/products/${product.id}/`, product);
  }
}
