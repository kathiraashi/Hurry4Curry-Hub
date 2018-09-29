import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { PurchaseBillService } from './../../../../services/PurchaseBill/purchase-bill.service';
import { AdminService } from './../../../../services/Admin/admin.service';

import { ModelUpdateYieldComponent } from '../../../../models/Inventory/model-update-yield/model-update-yield.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-receiveproducts',
  templateUrl: './list-receiveproducts.component.html',
  styleUrls: ['./list-receiveproducts.component.css']
})
export class ListReceiveproductsComponent implements OnInit {

   User_Id: any;
   _List: any[] = [];
   ActionIndex: number;
   ButtonType;
   bsModalRef: BsModalRef;
   Show_Received: Boolean = false;
   Show_UpdateYield: Boolean = false;

  constructor( private modalService: BsModalService,
      public PurchaseBill_Service: PurchaseBillService,
      public Service: AdminService,
      public Toaster: ToasterServiceService,
      public router: Router
      ) {
         this.User_Id = this.Service.GetUserInfo()['_id'];
   }


   ngOnInit() {
      const Data = { 'User_Id': this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.PurchaseBill_Service.PurchaseBill_List({'Info': Info}).subscribe(response => {
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

   SetActionId(_index) {
      this.ActionIndex = _index;
      this.Show_Received = !this._List[this.ActionIndex]['If_Received'];
      this.Show_UpdateYield = !this._List[this.ActionIndex]['If_YieldUpdated'];
      if (this._List[this.ActionIndex].Received === true) {
         this.ButtonType = 'UpdateYield';
      } else {
         this.ButtonType = 'Receive';
      }
   }

   UpdateYield() {
      const initialState = {
         Type: 'Create',
         Data: this._List[this.ActionIndex]
      };
      this.bsModalRef = this.modalService.show(ModelUpdateYieldComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }

   View() {
      this.router.navigate(['/View_Receive_Products', this._List[this.ActionIndex]['_id'] ]);
   }

   UpdateStock() {
      const Data = { 'User_Id': this.User_Id, 'HubPurchaseBill_Id': this._List[this.ActionIndex]._id};
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.PurchaseBill_Service.PurchaseBill_Received({'Info': Info}).subscribe(response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Purchase Received Successfully Updated' });
            this._List[this.ActionIndex].If_Received = true;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Creating Customer Getting Error!, But not Identify!' });
         }
      });
   }


}
