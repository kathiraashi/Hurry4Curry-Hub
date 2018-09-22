import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { LogExpensesService } from './../../../../services/Accounts/LogExpenses/log-expenses.service';

@Component({
  selector: 'app-list-log-expenses',
  templateUrl: './list-log-expenses.component.html',
  styleUrls: ['./list-log-expenses.component.css']
})
export class ListLogExpensesComponent implements OnInit {


   User_Id;
   Active_Id;
   _List: any[] = [];
   ShowRegisterPayment: Boolean = false;

   PaymentType = 'Cash';
   Reference_No = '';
   _PaymentOptions = ['Cash', 'Card'];

   bsModalRef: BsModalRef;

   constructor(
      private Toastr: ToasterServiceService,
      private Admin_Service: AdminService,
      public router: Router,
      public LogExpenses_Service: LogExpensesService,
      public bsModalService: BsModalService
   ) {
      this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
   }


   ngOnInit() {
      const Data = { 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.LogExpenses_Service.LogExpenses_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
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

   SetActiveId(_index) {
      this.Active_Id = _index;
      if (this._List[_index].Status_Position === 'Stage_1') {
         this.ShowRegisterPayment = true;
      } else {
         this.ShowRegisterPayment = false;
      }
   }

   RegisterPayment(template: TemplateRef<any>) {
      this.bsModalRef = this.bsModalService.show(template);
   }

   Update() {
      const Data = { LogExpenses_Id: this._List[this.Active_Id]._id,
                     User_Id : this.User_Id,
                     PaymentType : this.PaymentType,
                     Reference_No : this.Reference_No};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.LogExpenses_Service.LogExpenses_Update({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this._List[this.Active_Id].Status_Position = 'Stage_2';
            this._List[this.Active_Id].Current_Status = 'Completed';
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toastr.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toastr.NewToastrMessage({ Type: 'Error', Message: 'Log Expenses Updating Error!, But not Identify!' });
         }
      });

   }

}
