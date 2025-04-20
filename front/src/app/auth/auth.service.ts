import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

interface RegisterData{
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  password: string;
  address: string;
  phone_number: string;
}

interface LoginData{
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {
  }

  register(data: RegisterData): Observable<any> {
    return this.http.post(`${this.apiUrl}/registration/`, data);
  }

  login(data: LoginData): Observable<any> {
    return this.http.post(`${this.apiUrl}/token/`, data);
  }

}
