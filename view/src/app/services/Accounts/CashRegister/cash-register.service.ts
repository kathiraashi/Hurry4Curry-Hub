import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/CashRegister/';


@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {

   constructor(private http: Http) {
   }

   // CashRegister
   public CashRegister_List(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'CashRegister_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

}
