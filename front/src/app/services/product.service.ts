import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`);
  }

  getFeaturedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products/`);
  }

  addToWishList(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist/`, { product_id: productId });
  }

  removeFromWishList(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/wishlist/`, {
      body: { product_id: productId }
    });
  }
} 