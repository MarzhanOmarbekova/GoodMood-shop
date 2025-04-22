import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { LoginData, RegisterData } from '../models/auth.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.checkAuthStatus();
  }

  private checkAuthStatus(): void {
    const token = localStorage.getItem('access');
    if (token) {
      // Здесь можно добавить проверку валидности токена через API
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration/`, data).pipe(
      tap((response: any) => {
        console.log('Register response:', response);
        if (response.access) {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/']);
        }
      })
    );
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, data).pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        if (response.access) {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/']);
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh');
    return this.http.post(`${this.apiUrl}/token/refresh/`, { refresh }).pipe(
      tap((response: any) => {
        if (response.access) {
          localStorage.setItem('access', response.access);
          this.isAuthenticatedSubject.next(true);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
  }
} 