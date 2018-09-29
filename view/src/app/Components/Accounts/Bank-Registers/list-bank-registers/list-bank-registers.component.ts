import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { BankRegisterService } from './../../../../services/Accounts/BankRegister/bank-register.service';


@Component({
  selector: 'app-list-bank-registers',
  templateUrl: './list-bank-registers.component.html',
  styleUrls: ['./list-bank-registers.component.css']
})
export class ListBankRegistersComponent implements OnInit {

   User_Id;
   _List: any[] = [];

   constructor( private Toastr: ToasterServiceService,
      private Admin_Service: AdminService,
      public BankRegister_Service: BankRegisterService) {
         this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
      }

   ngOnInit() {
      const Data = { 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.BankRegister_Service.BankRegister_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            console.log(DecryptedData);
            this._List = DecryptedData;
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
