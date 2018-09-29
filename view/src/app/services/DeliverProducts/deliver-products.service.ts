import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/DeliverProducts/';

@Injectable({
  providedIn: 'root'
})
export class DeliverProductsService {

  constructor(private http: Http) { }
  public DeliverProducts_List(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'DeliverProducts_List', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public DeliverProducts_View(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'DeliverProducts_View', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public DeliverProducts_Deliver(Info: any): Observable<any[]> {
    sessionStorage.setItem('SessionKey', btoa(Date()));
    return this.http.post(API_URL + 'DeliverProducts_Deliver', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
}
