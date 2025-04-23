import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductDetailService {

  apiUrl = "http://127.0.0.1:8000/api/products/"

  constructor(private http: HttpClient) {}

  getProductDetail(productId: string):Observable<any> {
    return this.http.get(`${this.apiUrl}${productId}` )
  }
}
