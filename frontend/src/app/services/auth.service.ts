import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { HotToastService } from '@ngneat/hot-toast';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly urlEndPoint: string = `${environment.apiUrl}/auth`;
  private router = inject(Router);
  private http = inject(HttpClient);
  private toast = inject(HotToastService);
  constructor() { }

  login(user: User): Observable<User> {
    return this.http.post<User>(`${this.urlEndPoint}/login/`, user).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.access);
        this.router.navigate(['/admin']);
      }),
    );
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/auth/login']);
  }

  /** Get user data */
  getAuthUser(): Observable<User> {
    return this.http.get<User>(`${this.urlEndPoint}/me/`);
  }

  /** Load token from localstorage */
  getToken() {
    const token: any = localStorage.getItem('token');
    if (token) {
      return token;
    }
    localStorage.clear();
    return null;
  }
}
