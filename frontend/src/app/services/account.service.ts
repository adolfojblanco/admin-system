import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Expense } from '../models/Expense';
import { Supplier } from '../models/Supplier';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private readonly urlEndPoint: string = `${environment.apiUrl}/accounting`;
  private http = inject(HttpClient);


  constructor() { }

  getExpenses(): Observable<Expense[]> {
    return this.http.get<Expense[]>(`${this.urlEndPoint}/movements/`);
  }


  newSupplier(supplier: Supplier) {
    return this.http.post<Supplier[]>(`${this.urlEndPoint}/suppliers/`, supplier);
  }

  getSuppliers() {
    return this.http.get<Supplier[]>(`${this.urlEndPoint}/`);
  }

  newExpense(expense: Expense): Observable<Expense> {
    return this.http.post<Expense>(`${this.urlEndPoint}/movements/`, expense);
  }
}
