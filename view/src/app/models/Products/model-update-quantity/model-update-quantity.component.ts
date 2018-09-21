import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';

import * as CryptoJS from 'crypto-js';
import { StockService } from '../../../services/Stock/stock.service';
import { AdminService } from '../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../services/common-services/Toaster-Service/toaster-service.service';

@Component({
  selector: 'app-model-update-quantity',
  templateUrl: './model-update-quantity.component.html',
  styleUrls: ['./model-update-quantity.component.css']
})
export class ModelUpdateQuantityComponent implements OnInit {
  onClose: Subject<any>;
  Type: String;
  User_Id;
  Data;
  _UnitOfMeasure;
  Form: FormGroup;
  Product_Id: any;

  constructor(public bsModalRef: BsModalRef,
    public Service: StockService,
    private Toastr: ToasterServiceService,
    private Admin_Service: AdminService) {
      this.User_Id = this.Admin_Service.GetUserInfo()['_id'];
    }

  ngOnInit() {
   this.onClose = new Subject();
   this.Form = new FormGroup({
    User_Id: new FormControl(this.User_Id),
    Product_Id: new FormControl(this.Data['Product_Id']),
    UnitOfMeasure: new FormControl(this.Data['UnitOfMeasure']),
    Quantity: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
    Date: new FormControl(new Date())
   });
   // console.log(this.Form);
   this._UnitOfMeasure = this.Data['UnitOfMeasure']['Product_UnitOfMeasure'];
   //  console.log(this.Product_Id);
  }
  Update() {
    if (this.Form.valid) {
      const _Data = this.Form.value;
      // console.log(this._Data['Quantity']);

      let Info = CryptoJS.AES.encrypt(JSON.stringify(_Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Service.Stock_Create({'Info': Info}).subscribe(response => {
        const ReceivingData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ReceivingData.Status) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ReceivingData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this.Toastr.NewToastrMessage({  Type: 'Success', Message: 'Product Variant Successfully Updated'});
          this.onClose.next({Status: true, Response: DecryptedData});
          this.bsModalRef.hide();
       } else if (response['status'] === 400 || response['status'] === 417 && !ReceivingData.Status) {
          this.Toastr.NewToastrMessage({  Type: 'Error', Message: ReceivingData['Message'] });
          this.onClose.next({Status: false});
          this.bsModalRef.hide();
       }  else if (response['status'] === 401 && !ReceivingData['Status']) {
        this.Toastr.NewToastrMessage( { Type: 'Error', Message: ReceivingData['Message'] } );
     }  else {
          this.Toastr.NewToastrMessage({  Type: 'Error', Message: 'Error Not Identify!, Updating Product Variant!'} );
          this.onClose.next({Status: false});
          this.bsModalRef.hide();
       }
      });
    }
  }

}
