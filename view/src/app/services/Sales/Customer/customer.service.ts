import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

const API_URL = 'http://localhost:4000/API/Customer/';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: Http) {
  }

   // Sales Customer
  // public Customer_UserName_AsyncValidate(Info: any): Observable<any[]> {
  //    return this.http.post(API_URL + 'Customer_UserName_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
  // }
  public Customer_PhoneNumber_AsyncValidate(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Customer_PhoneNumber_AsyncValidate', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public Customer_Create(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Customer_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public Customer_List(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Customer_List', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  // public SalesFranchisee_SimpleList(Info: any): Observable<any[]> {
  //       return this.http.post(API_URL + 'Franchisee_SimpleList', Info).pipe( map(response => response),  catchError(error => of(error)));
  //     }
  public Customer_View(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Customer_View', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public Customer_Update(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Customer_Update', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
  public Customer_Edit(Info: any): Observable<any[]> {
    return this.http.post(API_URL + 'Customer_Edit', Info).pipe( map(response => response),  catchError(error => of(error)));
  }
}
