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
    const token = localStorage.getItem('access');
    this.isAuthenticatedSubject.next(!!token);
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration/`, data).pipe(
      tap((response: any) => {
        if (response.access) {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/home']); // Перенаправление на главную после успешной регистрации
        }
      })
    );
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, data).pipe(
      tap((response: any) => {
        if (response.access) {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          this.isAuthenticatedSubject.next(true);
          this.router.navigate(['/home']); // Перенаправление на главную после успешного входа
        }
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh');
    return this.http.post(`${this.apiUrl}/token/refresh/`, { refresh });
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }
} 