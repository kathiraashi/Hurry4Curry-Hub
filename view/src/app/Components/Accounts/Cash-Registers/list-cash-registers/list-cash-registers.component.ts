import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { CashRegisterService } from './../../../../services/Accounts/CashRegister/cash-register.service';


@Component({
  selector: 'app-list-cash-registers',
  templateUrl: './list-cash-registers.component.html',
  styleUrls: ['./list-cash-registers.component.css']
})
export class ListCashRegistersComponent implements OnInit {

      User_Id;
      _List: any[] = [];

   constructor( private Toastr: ToasterServiceService,
      private Admin_Service: AdminService,
      public CashRegister_Service: CashRegisterService) {
         this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
      }

   ngOnInit() {
      const Data = { 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.CashRegister_Service.CashRegister_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._List = DecryptedData;
            console.log(DecryptedData);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Log Expenses Getting Error!, But not Identify!' });
         }
      });
   }

}
