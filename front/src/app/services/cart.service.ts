import { Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  apiUrl = "http://127.0.0.1:8000/api/cart/";

  constructor(private http: HttpClient) {
  }

  getCart(): Observable<any> {
    return this.http.get(this.apiUrl)
  }

  addItem(productVariantId: number, quantity :number = 1):Observable<any> {
    return this.http.post(`${this.apiUrl}`, {
      product_variant_id: productVariantId,
      quantity: quantity,
    });
  }

  updateItem(productVariantId: number, quantity :number):Observable<any> {
    return this.http.put(`${this.apiUrl}`, {
      product_variant_id: productVariantId,
      quantity: quantity, });
  }

  removeItem(productVariantId: number):Observable<any> {
    return this.http.delete(`${this.apiUrl}`, {body:{ product_variant_id: productVariantId}})
  }
}
