import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/AccountSettings/';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

   constructor(private http: Http) { }

    // Bank
      public Bank_AsyncValidate(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_Create(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_List(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_List', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_Update(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_Delete(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_Delete', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public Bank_SimpleList(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'Bank_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
      }






   // Expense Type
      public ExpenseType_AsyncValidate(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'ExpenseType_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public ExpenseType_Create(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'ExpenseType_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public ExpenseType_List(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'ExpenseType_List', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public ExpenseType_Update(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'ExpenseType_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public ExpenseType_Delete(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'ExpenseType_Delete', Info).pipe( map(response => response),  catchError(error => of(error)));
      }
      public ExpenseType_SimpleList(Info: any): Observable<any[]> {
         sessionStorage.setItem('SessionKey', btoa(Date()));
         return this.http.post(API_URL + 'ExpenseType_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
      }

}
