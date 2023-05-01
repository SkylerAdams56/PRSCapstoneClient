import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Requestline } from './requestline.class';
import { Observable } from 'rxjs';
import { Request } from '../request/request.class';

@Injectable({
  providedIn: 'root'
})
export class RequestlineService {

  baseurl: string="http://localhost:5000/api/requestlines";

  constructor(
    private http: HttpClient
  ) { }

  list(): Observable<Requestline[]>{
    return this.http.get(`${this.baseurl}`) as Observable<Requestline[]>
  }

  get(id: number): Observable<Requestline>{
    return this.http.get(`${this.baseurl}/${id}`) as Observable<Requestline>
  }

  create(reqL: Requestline): Observable<Requestline>{
    return this.http.post(`${this.baseurl}`, reqL) as Observable<Requestline>;
  }
  change(reqL: Requestline): Observable<any>{
    return this.http.put(`${this.baseurl}/${reqL.id}`, reqL) as Observable<any>;
  }
  remove(id: number): Observable<any>{
    return this.http.delete(`${this.baseurl}/${id}`) as Observable<any>;
  }
}
