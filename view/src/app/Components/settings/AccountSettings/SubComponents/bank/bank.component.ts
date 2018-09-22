import { Component, OnInit } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelBankComponent } from '../../../../../models/settings/Accounts/model-bank/model-bank.component';
import { DeleteConfirmationComponent } from '../../../../Common-Components/delete-confirmation/delete-confirmation.component';

import { AccountsService } from './../../../../../services/settings/accounts.service';
import { ToasterServiceService } from './../../../../../services/common-services/Toaster-Service/toaster-service.service';
import { AdminService } from './../../../../../services/Admin/admin.service';


@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css']
})
export class BankComponent implements OnInit {


   bsModalRef: BsModalRef;
   _Create: Boolean = false;
   _View: Boolean = false;
   _Edit: Boolean = false;
   _Delete: Boolean = false;
   Loader: Boolean = true;
   _List: any[] = [];

   User_Id;

   constructor(   private modalService: BsModalService,
                  private Service: AccountsService,
                  private Toastr: ToasterServiceService,
                  private Admin_Service: AdminService
               ) {
                  this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
                  // Get Bank List
                     const Data = { 'User_Id' : this.User_Id };
                     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
                     Info = Info.toString();
                     this.Loader = true;
                     this.Service.Bank_List({'Info': Info}).subscribe( response => {
                        const ResponseData = JSON.parse(response['_body']);
                        this.Loader = false;
                        if (response['status'] === 200 && ResponseData['Status'] ) {
                           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
                           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
                           this._List = DecryptedData;
                        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
                        } else if (response['status'] === 401 && !ResponseData['Status']) {
                           this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
                        } else {
                           this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Bank List Getting Error!, But not Identify!' });
                        }
                     });
                  }

   ngOnInit() { }


   // Create New Bank
      Create_Bank() {
         const initialState = { Type: 'Create', Data: {} };
         this.bsModalRef = this.modalService.show(ModelBankComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-lg' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
              this._List.splice(0, 0, response['Response']);
            }
         });
      }
   // Edit Bank
      Edit_Bank(_index) {
         const initialState = {
            Type: 'Edit',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelBankComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-lg' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response['Status']) {
               this._List[_index] = response['Response'];
            }
         });
      }
   // View Bank
      View_Bank(_index) {
         const initialState = {
            Type: 'View',
            Data: this._List[_index]
         };
         this.bsModalRef = this.modalService.show(ModelBankComponent, Object.assign({initialState}, { class: '' }));
      }
   // Delete Bank
      Delete_Bank(_index) {
         const initialState = {
            Text: 'Bank'
         };
         this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, {ignoreBackdropClick: true, class: 'modal-sm' }));
         this.bsModalRef.content.onClose.subscribe(response => {
            if (response.Status) {
               const Data = { 'Bank_Id':  this._List[_index]._id, 'User_Id' : this.User_Id };
               let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
               Info = Info.toString();
               this.Service.Bank_Delete({'Info': Info}).subscribe( returnResponse => {
                  const ResponseData = JSON.parse(returnResponse['_body']);
                  if (returnResponse['status'] === 200 && ResponseData['Status'] ) {
                     this._List.splice(_index, 1);
                     this.Toastr.NewToastrMessage( { Type: 'Warning', Message: 'Bank Successfully Deleted'} );
                  } else if (returnResponse['status'] === 400 || returnResponse['status'] === 417 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: ResponseData['Message'] } );
                  } else if (returnResponse['status'] === 401 && !ResponseData['Status']) {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: ResponseData['Message'] } );
                  } else {
                     this.Toastr.NewToastrMessage( { Type: 'Error', Message: 'Some Error Occurred!, But not Identify!' } );
                  }
               });
            }
         });
      }


}
