import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/ProductSettings/';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: Http) { }

  // Product Variants
     public ProductVariant_AsyncValidate(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductVariant_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductVariant_Create(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductVariant_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductVariant_List(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductVariant_List', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductVariant_Update(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductVariant_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductVariant_Delete(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductVariant_Delete', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductVariant_SimpleList(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductVariant_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
     }





  // Product Unit Of Measure
     public ProductUnitOfMeasure_AsyncValidate(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductUnitOfMeasure_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductUnitOfMeasure_Create(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductUnitOfMeasure_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductUnitOfMeasure_List(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductUnitOfMeasure_List', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductUnitOfMeasure_Update(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductUnitOfMeasure_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductUnitOfMeasure_Delete(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductUnitOfMeasure_Delete', Info).pipe( map(response => response),  catchError(error => of(error)));
     }
     public ProductUnitOfMeasure_SimpleList(Info: any): Observable<any[]> {
        sessionStorage.setItem('SessionKey', btoa(Date()));
        return this.http.post(API_URL + 'ProductUnitOfMeasure_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
     }


}
