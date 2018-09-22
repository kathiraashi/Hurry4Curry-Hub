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
  selector: 'app-model-expense-type',
  templateUrl: './model-expense-type.component.html',
  styleUrls: ['./model-expense-type.component.css']
})
export class ModelExpenseTypeComponent implements OnInit {


   onClose: Subject<any>;

   Type: string;
   Data;

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

      // If Create New ExpenseType
         if (this.Type === 'Create') {
            this.Form = new FormGroup({
               Expense_Type: new FormControl( '', {  validators: Validators.required,
                                                      asyncValidators: [this.ExpenseType_AsyncValidate.bind(this)],
                                                      updateOn: 'blur' } ),
               Created_By: new FormControl( this.User_Id, Validators.required ),
            });
         }
      // If Edit New ExpenseType
         if (this.Type === 'Edit') {
            this.Form = new FormGroup({
               Expense_Type: new FormControl(this.Data['Expense_Type'], { validators: Validators.required,
                                                                        asyncValidators: [this.ExpenseType_AsyncValidate.bind(this)],
                                                                        updateOn: 'blur' }),
               Expense_Type_Id: new FormControl(this.Data['_id'], Validators.required),
               User_Id: new FormControl(this.User_Id, Validators.required)
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

      ExpenseType_AsyncValidate( control: AbstractControl ) {
         const Data = { Expense_Type: control.value, User_Id: this.User_Id  };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         return this.Service.ExpenseType_AsyncValidate({'Info': Info}).pipe(map( response => {
            if (this.Data['Expense_Type'] && this.Data['Expense_Type'] === control.value) {
               return null;
            } else {
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
                  return null;
               } else {
                  return { ExpenseType_NotAvailable: true};
               }
            }
         }));
      }

   // Submit New ExpenseType
      submit() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.ExpenseType_Create({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage( {  Type: 'Success', Message: 'New Expense Type Successfully Created'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage( {  Type: 'Error', Message: ReceivingData['Message']});
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               } else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             } else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Creating Expense Type!'});
                  this.onClose.next({Status: false, Message: 'UnExpected Error!'});
                  this.bsModalRef.hide();
               }
            });
         }
      }

   // Update Expense Type
      update() {
         if (this.Form.valid && !this.Uploading) {
            this.Uploading = true;
            const Data = this.Form.value;
            let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
            Info = Info.toString();
            this.Service.ExpenseType_Update({'Info': Info}).subscribe( response => {
               this.Uploading = false;
               const ReceivingData = JSON.parse(response['_body']);
               if (response['status'] === 200 && ReceivingData.Status) {
                  const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
                  const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                  this.Toastr.NewToastrMessage({  Type: 'Success', Message: 'Expense Type Successfully Updated'});
                  this.onClose.next({Status: true, Response: DecryptedData});
                  this.bsModalRef.hide();
               } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: ReceivingData['Message'] });
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }  else if (response['status'] === 401 && !ReceivingData['Status']) {
                this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
             }  else {
                  this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Updating Expense Type!'} );
                  this.onClose.next({Status: false});
                  this.bsModalRef.hide();
               }
            });
         }
      }

}
