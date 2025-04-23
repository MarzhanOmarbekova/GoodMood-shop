import { Injectable, Injector } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private injector: Injector) {} // ❗ заменили AuthService на Injector

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authService = this.injector.get(AuthService); // ❗ получаем AuthService тут

    if (!req.url.startsWith(this.apiUrl)) {
      return next.handle(req);
    }

    const access = localStorage.getItem('access');
    const isAuthRequest = req.url.includes('/token/') || req.url.includes('/registration/');

    if (access && !isAuthRequest) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refresh = localStorage.getItem('refresh');

          if (refresh && !req.url.includes('/token/refresh/')) {
            return authService.refreshToken().pipe(
              switchMap((res: any) => {
                localStorage.setItem('access', res.access);
                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.access}`
                  }
                });
                return next.handle(newReq);
              }),
              catchError((err) => {
                if (err.status === 401) {
                  authService.logout();
                }
                return throwError(() => err);
              })
            );
          } else {
            authService.logout();
          }
        }

        return throwError(() => error);
      })
    );
  }
}
