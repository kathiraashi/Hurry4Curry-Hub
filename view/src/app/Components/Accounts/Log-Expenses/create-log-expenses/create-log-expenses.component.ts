import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import * as CryptoJS from 'crypto-js';

import { AccountsService } from './../../../../services/settings/accounts.service';
import { LogExpensesService } from './../../../../services/Accounts/LogExpenses/log-expenses.service';
import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { AdminService } from './../../../../services/Admin/admin.service';

@Component({
  selector: 'app-create-log-expenses',
  templateUrl: './create-log-expenses.component.html',
  styleUrls: ['./create-log-expenses.component.css']
})
export class CreateLogExpensesComponent implements OnInit {


   Uploading: Boolean = false;
   Form: FormGroup;
   User_Id;
   _ExpensesTypes: any[] = [];

   constructor(
      public Service: AccountsService,
      private Toastr: ToasterServiceService,
      private Admin_Service: AdminService,
      public router: Router,
      public LogExpenses_Service: LogExpensesService
   ) {
      this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
   }


   ngOnInit() {

      const Data = { 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.ExpenseType_SimpleList({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._ExpensesTypes = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Expenses Types Getting Error!, But not Identify!' });
         }
      });

      this.Form = new FormGroup({
         Expenses_Type: new FormControl(null, Validators.required ),
         Expenses: new FormControl('', Validators.required ),
         Date: new FormControl(new Date(), Validators.required ),
         Amount: new FormControl('', Validators.required ),
         Created_By: new FormControl( this.User_Id, Validators.required ),
      });
   }

   DoNothing() {
      return false;
   }

   submit() {
      if (this.Form.valid && !this.Uploading) {
         this.Uploading = true;
         const Data = this.Form.value;
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.LogExpenses_Service.LogExpenses_Create({'Info': Info}).subscribe( response => {
            this.Uploading = false;
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Success', Message: 'New Log Expense Successfully Created'});
               this.router.navigate(['/List_Log_Expenses']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
               this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message']});
            } else if (response['status'] === 401 && !ReceivingData['Status']) {
             this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
            } else {
               this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, CreatingBank!'});
            }
         });
      }
   }

}
