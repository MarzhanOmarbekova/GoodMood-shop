import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getUserProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.apiUrl}/userinfo`);
  }

  updateProfile(data: Partial<UserProfile>): Observable<UserProfile> {
    return this.http.put<UserProfile>(`${this.apiUrl}/profile/`, data);
  }

  getOrders(): Observable<any> {
    return this.http.get(`${this.apiUrl}/orders/`);
  }

  getWishlist(): Observable<any> {
    return this.http.get(`${this.apiUrl}/wishlist/`);
  }
} 