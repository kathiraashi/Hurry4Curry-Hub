import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/LogExpenses/';

@Injectable({
  providedIn: 'root'
})
export class LogExpensesService {

   constructor(private http: Http) {
   }

   // Bank
   public LogExpenses_Create(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'LogExpenses_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public LogExpenses_List(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'LogExpenses_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
   public LogExpenses_Update(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'LogExpenses_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
   }


}
