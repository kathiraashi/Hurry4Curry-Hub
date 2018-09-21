import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Supplier/';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  constructor(private http: Http) { }

  // supplier
  public Supplier_PhoneNumber_AsyncValidate(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Supplier_PhoneNumber_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public Supplier_Create(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Supplier_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
 public Supplier_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Supplier_List', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public Supplier_View(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Supplier_View', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public Supplier_Update(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'Supplier_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
}
