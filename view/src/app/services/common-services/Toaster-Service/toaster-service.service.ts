import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToasterServiceService {

   constructor() { }

   private ToastrMessage =  new Subject<any>();

   WaitingToastr = this.ToastrMessage.asObservable();

   NewToastrMessage(Message) {
      this.ToastrMessage.next(Message);
   }
}
