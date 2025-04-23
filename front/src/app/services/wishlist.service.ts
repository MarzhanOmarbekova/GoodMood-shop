import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { WishlistItem } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private apiUrl: string = "http://127.0.0.1:8000/api";

  constructor(private http: HttpClient) { }

  getWishList(): Observable<WishlistItem[]> {
    return this.http.get<WishlistItem[]>(`${this.apiUrl}/wishlist/`);
  }

  addToWishList(productId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/wishlist/`, { product_id: productId });
  }

  removeFromWishList(productId: string): Observable<any> {
    console.log(productId);
    return this.http.delete(`${this.apiUrl}/wishlist/`, {
      body: { product_id: productId }
    });
  }
}
