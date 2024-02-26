import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DataClass } from '../models/data.class';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {}

  readHttp(): Observable<any> {
    return this.http.get('/api/endpoint/read');
  }
  calculateHttp(item: DataClass): Observable<any> {
    return this.http.post('/api/endpoint/calculate', item);
  }
  createHttp(item: DataClass): Observable<any> {
    return this.http.post('/api/endpoint/create', item);
  }

}
