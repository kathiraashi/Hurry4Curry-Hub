import { Component, OnInit, TemplateRef } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { BillService } from './../../../../services/Bill/bill.service';
import { AdminService } from './../../../../services/Admin/admin.service';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-franchisee-bill-list',
  templateUrl: './franchisee-bill-list.component.html',
  styleUrls: ['./franchisee-bill-list.component.css']
})
export class FranchiseeBillListComponent implements OnInit {


   bsModalRef: BsModalRef;
   User_Id: any;
   Active_Id;
   _List: any[] = [];
   ActionIndex: number;
   ShowPayments: Boolean = false;

   _PaymentOptions = ['Cash', 'NEFT/RTGS'];
   PaymentType = 'Cash';
   Reference_No = '';


   constructor( private bsModalService: BsModalService,
    public Bill_Service: BillService,
    public Service: AdminService,
    public Toaster: ToasterServiceService,
    public router: Router) {
      this.User_Id = this.Service.GetUserInfo()['_id'];
    }

   ngOnInit() {
    const Data = {'User_Id' : this.User_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    this.Bill_Service.FranchiseeBill_List({'Info': Info}).subscribe( response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status'] ) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this._List = DecryptedData;
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
       } else {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Customer List Getting Error!, But not Identify!' });
       }
    });

   }

   SetActiveId(_index) {
      this.Active_Id = _index;
      if (this._List[_index].Payment_Status === 'Unpaid') {
         this.ShowPayments = true;
      } else {
         this.ShowPayments = false;
      }
   }

   RegisterPayment(template: TemplateRef<any>) {
      this.bsModalRef = this.bsModalService.show(template);
   }


   Update() {

      const Data = { FranchiseeBill_Id: this._List[this.Active_Id]._id,
                     User_Id : this.User_Id,
                     PaymentType : this.PaymentType,
                     ReferenceNumber : this.Reference_No };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Bill_Service.FranchiseeBill_PaymentUpdate({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this._List[this.Active_Id].Payment_Status = 'Paid';
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Log Expenses Updating Error!, But not Identify!' });
         }
      });
   }


}
