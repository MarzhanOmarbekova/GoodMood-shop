import { Injectable } from "@angular/core"
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import {Product} from '../models/product.model';

@Injectable({
  providedIn: 'root'
})

export class WishlistService {

  private apiUrl: string = "http://127.0.0.1:8000/api/wishlist/";

  constructor(private http: HttpClient) { }

  getWishList(): Observable<{products: Product[]}[]> {
    return this.http.get<{products: Product[]}[]>(this.apiUrl);
  }

  addToWishList(productId: number): Observable<any> {
    return this.http.post( this.apiUrl, {product_id: productId} );
  }

  removeFromWishList(productId: number): Observable<any> {
    return this.http.delete( this.apiUrl, {body:{product_id: productId}} );
  }



}
