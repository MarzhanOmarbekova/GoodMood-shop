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

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // req: это твой исходный запрос
    // next: это объект, который пропускает запрос дальше
    // HttpEvent: ответ от сервера (например, данные от GET, результат POST, ошибка и т.п.)
    const access = localStorage.getItem('access');

    if (access && !req.url.includes('/token/') && !req.url.includes('/registration/')) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${access}`
        }
      })
    }
    // handle(req): запускает отправку запроса
    return next.handle(req).pipe(
      // Мы передаём в pipe() операторы, которые будут применять логику после запроса.
      catchError((error: HttpErrorResponse) => {

        if (error.status === 401 && localStorage.getItem('refresh')) {
          return this.authService.refreshToken().pipe(
            switchMap((res:any) => {
              localStorage.setItem('access', res.access);
              const newReq = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${res.access}`
                }
              });
              return next.handle(newReq);
            }),
            catchError((err) => {
              this.authService.logout();
              return throwError(() => err);
            })
          )
        } else {
          this.authService.logout();
        }
        return throwError(() => error);
      })
    );
  }

}
