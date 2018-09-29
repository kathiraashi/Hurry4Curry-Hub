import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/FranchiseePurchaseOrder/';
@Injectable({
  providedIn: 'root'
})
export class FranshiseOrderService {

  constructor(private http: Http) { }
  public FranchiseePurchaseOrder_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'FranchiseePurchaseOrder_List', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public FranchiseePurchaseOrder_View(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'FranchiseePurchaseOrder_View', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public FranchiseePurchaseOrder_CreateDeliver(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'FranchiseePurchaseOrder_CreateDeliver', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
}
