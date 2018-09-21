import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Product/';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: Http) { }

   // Hub
   public ProductGroupName_AsyncValidate(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'ProductGroupName_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Product_Create(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Product_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Product_List(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Product_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Product_View(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Product_View', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public Product_Update(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Product_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
}
