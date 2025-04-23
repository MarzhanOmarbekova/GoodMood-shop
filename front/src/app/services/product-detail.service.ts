import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ProductDetail} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class ProductDetailService {

  private apiUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) {}

  getProductDetail(productId: string):Observable<ProductDetail> {
    return this.http.get<ProductDetail>(`${this.apiUrl}/products/${productId}`);
  }

  addToWishList(productId: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/wishlist/`, { product_id: productId });
  }

  removeFromWishList(productId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/wishlist/`, { body: { product_id: productId } });
  }
}
