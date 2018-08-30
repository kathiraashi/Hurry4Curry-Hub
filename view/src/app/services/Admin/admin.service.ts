import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import * as CryptoJS from 'crypto-js';


const API_URL = 'http://localhost:4000/API/AdminManagement/';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

   constructor(private http: Http) { }

   public HubUser_Validate(Info: any): Observable<any[]> {
      return this.http.post(API_URL + 'HubUser_Validate', Info).pipe( map(response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status']) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            sessionStorage.setItem('Session', btoa(JSON.stringify(DecryptedData)));
            sessionStorage.setItem('SessionKey', btoa(Date()));
         }
         return response; }),  catchError(error => of(error)));
   }

   public If_LoggedIn() {
      if (sessionStorage.getItem('Session') && sessionStorage.getItem('SessionKey') ) {
         const LastSession = new Date(atob(sessionStorage.getItem('SessionKey'))).getTime();
         const NowSession = new Date().getTime();
         const SessionDiff: number = NowSession - LastSession;
         const SessionDiffMinutes: number = SessionDiff / 1000 / 60 ;
         if (SessionDiffMinutes < 20 ) {
            return true;
         } else {
            sessionStorage.clear();
            return false;
         }
      } else { sessionStorage.clear(); return false;  }
   }
   public GetUserInfo() {
      return JSON.parse(atob(sessionStorage.getItem('Session')));
   }

   public Country_List(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'Country_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

   public State_List(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'State_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

   public City_List(Info: any): Observable<any[]> {
      sessionStorage.setItem('SessionKey', btoa(Date()));
      return this.http.post(API_URL + 'City_List', Info).pipe( map(response => response),  catchError(error => of(error)));
   }

}
