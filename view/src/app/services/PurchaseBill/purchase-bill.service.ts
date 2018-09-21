import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of, ObservableLike } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/PurchaseBill/';

@Injectable({
  providedIn: 'root'
})
export class PurchaseBillService {

  constructor(private http: Http) { }
  public PurchaseBill_RefNo_AsyncValidate(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'PurchaseBill_RefNo_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public PurchaseBill_Create(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'PurchaseBill_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public PurchaseBill_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'PurchaseBill_List', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public PurchaseBill_View(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'PurchaseBill_View', Info).pipe( map(response => response),  catchError(error => of(error)));
 }
 public PurchaseBill_UpdateStock(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'PurchaseBill_UpdateStock', Info).pipe( map(response => response),  catchError(error => of(error)));
}
public PurchaseBill_YieldUpdate_List(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'PurchaseBill_YieldUpdate_List', Info).pipe( map(response => response),  catchError(error => of(error)));
}
public PurchaseBill_Yield_Update(Info: any): Observable<any[]> {
  sessionStorage.setItem('SessionKey', btoa(Date()));
  return this.http.post(API_URL + 'PurchaseBill_Yield_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
}
}
