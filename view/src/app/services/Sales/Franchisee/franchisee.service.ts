import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Franchisee/';

@Injectable({
  providedIn: 'root'
})
export class FranchiseeService {

   constructor(private http: Http) {
   }

   // Sales Franchisee
   public SalesFranchisee_UserName_AsyncValidate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Franchisee_UserName_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public SalesFranchisee_PhoneNumber_AsyncValidate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Franchisee_PhoneNumber_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public SalesFranchisee_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Franchisee_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
   public SalesFranchisee_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Franchisee_List', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
   public SalesFranchisee_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Franchisee_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
   public SalesFranchisee_View(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'Franchisee_View', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public SalesFranchisee_Update(Info: any): Observable<any[]> {
            return this.http.post(API_URL + 'Franchisee_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public SalesFranchisee_Edit(Info: any): Observable<any[]> {
            return this.http.post(API_URL + 'Franchisee_Edit', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
}

