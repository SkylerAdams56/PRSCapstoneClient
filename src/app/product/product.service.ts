import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './product.class';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseurl: string="http://localhost:2000/api/products";

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Product[]>{
    return this.http.get(`${this.baseurl}`) as Observable<Product[]>
  }

  get(id: number): Observable<Product>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Product>
  }

  create(prod: Product): Observable<Product>{
    return this.http.post(`${this.baseurl}`, prod) as Observable<Product>;
  }
  change(prod: Product): Observable<any>{
    return this.http.put(`${this.baseurl}/${prod.id}`, prod) as Observable<any>;
  }
  remove(id: number): Observable<any>{
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  }
}
