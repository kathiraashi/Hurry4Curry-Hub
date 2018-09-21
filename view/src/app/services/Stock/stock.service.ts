import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Stock/';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  constructor(private http: Http) { }

  public Stock_Create(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Stock_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public Stock_Update(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'Stock_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
}
 public Stock_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Stock_List', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public Stock_History_List(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'Stock_History_List', Info).pipe( map(response => response),  catchError(error => of(error)));
}
}
