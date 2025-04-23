import {Injectable} from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import {catchError, Observable, switchMap, throwError} from 'rxjs';
import {AuthService} from './auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  private apiUrl = 'http://127.0.0.1:8000/api/';

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Проверяем, является ли запрос к нашему API
    if (!req.url.startsWith(this.apiUrl)) {
      return next.handle(req);
    }

    const access = localStorage.getItem('access');
    const isAuthRequest = req.url.includes('/token/') || req.url.includes('/registration/');

    // Добавляем токен ко всем запросам к API, кроме аутентификации
    if (access && !isAuthRequest) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Обрабатываем только 401 ошибки для API запросов
        if (error.status === 401) {
          const refresh = localStorage.getItem('refresh');
          
          // Пытаемся обновить токен, если есть refresh token и это не запрос обновления токена
          if (refresh && !req.url.includes('/token/refresh/')) {
            return this.authService.refreshToken().pipe(
              switchMap((res: any) => {
                // Обновляем access token в localStorage
                localStorage.setItem('access', res.access);
                
                // Повторяем исходный запрос с новым токеном
                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${res.access}`
                  }
                });
                return next.handle(newReq);
              }),
              catchError((err) => {
                // Если не удалось обновить токен, выходим из системы
                if (err.status === 401) {
                  this.authService.logout();
                }
                return throwError(() => err);
              })
            );
          } else {
            // Если нет refresh token или это запрос обновления токена, выходим из системы
            this.authService.logout();
          }
        }
        
        return throwError(() => error);
      })
    );
  }
}
