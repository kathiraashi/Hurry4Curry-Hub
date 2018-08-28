import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


const API_URL = 'http://localhost:4000/API/AdminManagement/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   constructor(private http: Http) { }


public User_Name_Validate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'User_Name_Validate', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

public User_Create(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'User_Create', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

public UserTypeBased_SimpleUsersList(Info: any): Observable<any[]> {
   return this.http.post(API_URL + 'UserTypeBased_SimpleUsersList', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

public Users_List(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'Users_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

public UserTypes_List(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'UserTypes_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
public Country_List(Info: any): Observable<any[]> {
   return this.http.post(API_URL + 'Country_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
public State_List(Info: any): Observable<any[]> {
   return this.http.post(API_URL + 'State_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }
public City_List(Info: any): Observable<any[]> {
   return this.http.post(API_URL + 'City_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

}
