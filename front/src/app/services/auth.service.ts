import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {LoginData, RegisterData} from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient, private router: Router) {
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration/`, data);
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, data);
  }

  refreshToken() {
    const refresh = localStorage.getItem('refresh');
    return this.http.post(`${this.apiUrl}/refresh`, refresh);

  }

  logout() {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.router.navigate(['/login']);
  }

}
