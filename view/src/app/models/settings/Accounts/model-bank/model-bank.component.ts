import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { AccountsService } from './../../../../services/settings/accounts.service';
import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { AdminService } from './../../../../services/Admin/admin.service';

@Component({
  selector: 'app-model-bank',
  templateUrl: './model-bank.component.html',
  styleUrls: ['./model-bank.component.css']
})
export class ModelBankComponent implements OnInit {


   onClose: Subject<any>;

   Type: string;
   Data;

   _Account_Types = ['Savings', 'Current', 'Fixed Deposit'];

   Uploading: Boolean = false;
   Form: FormGroup;
   User_Id;

   constructor( public bsModalRef: BsModalRef,
                public Service: AccountsService,
                private Toastr: ToasterServiceService,
                private Admin_Service: AdminService
            ) {
               this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
            }

   ngOnInit() {
      this.onClose = new Subject();

      // If Create New Bank
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               Account_Name: new FormControl( '', Validators.required ),
               Account_No: new FormControl( '', {  validators: Validators.required,
                                                      asyncValidators: [this.Account_No_AsyncValidate.bind(this)],
                                                      updateOn: 'blur' } ),
               Account_Type: new FormControl( null, Validators.required ),
               Bank_Name: new FormControl( '', Validators.required ),
               IFSC_Code: new FormControl( '', Validators.required ),
               Address: new FormControl( '', Validators.required ),
               If_Default: new FormControl( true, Validators.required ),
               Created_By: new FormControl( this.User_Id, Validators.required ),
            });
         }
      // If Edit Bank
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Account_Name: new FormControl(this.Data['Account_Name'], Validators.required ),
               Account_No: new FormControl(this.Data['Account_No'], {  validators: Validators.required,
                                                                        asyncValidators: [this.Account_No_AsyncValidate.bind(this)],
                                                                        updateOn: 'blur' } ),
               Account_Type: new FormControl(this.Data['Account_Type'], Validators.required ),
               Bank_Name: new FormControl( this.Data['Bank_Name'], Validators.required ),
               IFSC_Code: new FormControl( this.Data['IFSC_Code'], Validators.required ),
               Address: new FormControl( this.Data['Address'], Validators.required ),
               Bank_Id: new FormControl( this.Data['_id'], Validators.required ),
               If_Default: new FormControl( this.Data['If_Default'], Validators.required ),
               User_Id: new FormControl( this.User_Id, Validators.required ),
            });
         }
   }
   // onSubmit Function
      onSubmit() {
         if (this.Type === 'Create') {
            this.submit();
         }
         if (this.Type === 'Edit') {
            this.update();
         }
      }

      Account_No_AsyncValidate( control: AbstractControl ) {
         const Data = { Account_No: control.value, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         return this.Service.Bank_AsyncValidate({'Info': Info}).pipe(map( response => {
            if ( this.Type === 'Edit' && this.Data['Account_No'] && this.Data['Account_No'] === control.value) {
               return null;
            } else {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
                  return null;
               } else {
                  return { AccountNo_NotAvailable: true};
               }
            }
         }));
      }

   // Submit New Bank
      submit() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Bank_Create({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( {  Type: 'Success', Message: 'New Bank Successfully Created'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message']});
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             } else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, CreatingBank!'});
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

   // Update Bank
      update() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.Bank_Update({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage({  Type: 'Success', Message: 'Bank Successfully Updated'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: ReceivingData['Message'] });
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }  else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Updating Bank!'} );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }
            });
         }
      }


}
