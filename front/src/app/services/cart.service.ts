import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  apiUrl = "http://127.0.0.1:8000/api/cart";

  constructor(private http: HttpClient) {
  }

  addToCart(productVariantId: number) {
    return this.http.post(`${this.apiUrl}`, {
      variant_id: productVariantId,
      quantity: 1,
    });
  }
}
