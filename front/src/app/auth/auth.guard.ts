import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['/auth/login']);
      })
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated$.pipe(
      take(1),
      map(isAuthenticated => {
        if (!isAuthenticated) {
          return true;
        }
        return this.router.createUrlTree(['/home']);
      })
    );
  }
} 