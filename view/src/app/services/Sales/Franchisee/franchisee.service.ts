import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/SalesFranchisee/';
@Injectable({
  providedIn: 'root'
})
export class FranchiseeService {

   constructor(private http: Http) {
   }

   // Sales Franchisee
   public SalesFranchisee_Create(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'SalesFranchisee_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
   public SalesFranchisee_List(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'SalesFranchisee_List', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
   public SalesFranchisee_SimpleList(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'SalesFranchisee_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
   public SalesFranchisee_View(Info: any): Observable<any[]> {
         return this.http.post(API_URL + 'SalesFranchisee_View', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
}
