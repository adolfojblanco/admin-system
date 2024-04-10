import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { Observable, catchError, throwError, map } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptorService {
  private router = inject(Router);
  private authServices = inject(AuthService);
  private toast = inject(HotToastService);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token: string | null = this.authServices.getToken();
    let request = req;
    if (token) {
      request = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((err: any) => {
        if (err.status === 401) {
          return throwError(() => {
            localStorage.removeItem('token');
            this.router.navigate(['/auth/login']);
            this.toast.error(`${err.error.detail}`);
          });
        }

        if (err.status === 403) {
          this.router.navigate(['/auth/login']);
          this.toast.error(`${err.error.detail}`);
        }

        if (err.status === 400) {
          const er = Object.values(err.error);
          const messaje = Object.keys(err.error)
          for (let index = 0; index < er.length; index++) {
            this.toast.error(`${messaje[index]}, ${er[index]}`)
          }

        }



        return throwError(() => {
          if (err.message.includes('0 Unknown Error')) {
            this.toast.error(`Ocurrio un error desconocido, intentalo más tarde`)
          }
        });
      })
    )
  }
}
