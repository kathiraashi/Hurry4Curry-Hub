import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { StockService } from './../../../../services/Stock/stock.service';
import { AdminService } from './../../../../services/Admin/admin.service';

@Component({
  selector: 'app-list-stock-values',
  templateUrl: './list-stock-values.component.html',
  styleUrls: ['./list-stock-values.component.css']
})
export class ListStockValuesComponent implements OnInit {
  User_Id;
  Loader: Boolean = true;
  _List: any[] = [];
  ActionIndex: number;
  Type;

  bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService, private Toaster: ToasterServiceService,
    public Service: AdminService,
    public router: Router,
    public Stock_Service: StockService
  ) {
    this.User_Id = this.Service.GetUserInfo()['_id'];
  }

   ngOnInit() {
    const Data = {'User_Id' : this.User_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    this.Loader = true;
    this.Stock_Service.Stock_List({'Info': Info}).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      this.Loader = false;
      if (response['status'] === 200 && ResponseData['Status']) {
        const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
        const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
        this._List = DecryptedData;
        console.log(this._List);
      } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
      } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
      } else {
        this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Stock List Getting Error!, But not Identify!' });
      }
    });
  }
  SetActionId(_index) {
    this.ActionIndex = _index;
   }
   DeleteStockValues() {
      const initialState = {
         Text: 'StockValues'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }

}
