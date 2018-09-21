import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, AbstractControl  } from '@angular/forms';

import { ToasterServiceService } from './../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { PurchaseBillService } from './../../../services/PurchaseBill/purchase-bill.service';
import { AdminService } from './../../../services/Admin/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-model-update-yield',
  templateUrl: './model-update-yield.component.html',
  styleUrls: ['./model-update-yield.component.css']
})
export class ModelUpdateYieldComponent implements OnInit {

  TodayDate = new Date().toLocaleDateString('en-GB');
  Form;
  User_Id: any;
  Type: string;
  Data;
  _Data;
  Loader: Boolean = true;
  QuantityValue: any;
  refrenceId;
  Product_Id: any;
  SupplierBill_Id: any;

  constructor(public bsModalRef: BsModalRef,
    public PurchaseBill_Service: PurchaseBillService,
    public Service: AdminService,
    public Toaster: ToasterServiceService,
    public router: Router,
    private formBuilder: FormBuilder) {this.User_Id =  this.Service.GetUserInfo()['_id']; }

  ngOnInit() {
   // Form
   this.Form = new FormGroup({
     YieldQty: new FormControl(null, [Validators.max(this.QuantityValue)]),
     WastageQty: new FormControl(null)
   });
    // list the product details
    const Data = { 'User_Id': this.User_Id, SupplierBill_Id: this.Data._id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.PurchaseBill_Service.PurchaseBill_YieldUpdate_List({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Data = DecryptedData;
            console.log(this._Data);
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Customer Data Getting Error!, But not Identify!' });
         }
      });
  }

  ProductChange(value) {
    console.log(value);
    this.refrenceId = value._id;
    this.Product_Id = value.Product_Id._id;
    this.QuantityValue = value.Quantity;
    this.SupplierBill_Id = value.SupplierBill_Id;
    console.log(this.QuantityValue);
  }
  onTabQuantity() {
    const YieldQtyValue: number = this.Form.controls.YieldQty.value;
    const WastageQtyValue: number = this.QuantityValue - YieldQtyValue;
    this.Form.controls.WastageQty.setValue(WastageQtyValue);

  }
  Submit() {
    const DataOut = { 'User_Id': this.User_Id,
    'Reference_Id': this.refrenceId,
    'Product_Id': this.Product_Id,
    'WastageQty': this.Form.controls.WastageQty.value,
    'YieldQty': this.Form.controls.YieldQty.value,
    'SupplierBill_Id': this.SupplierBill_Id };
    console.log(DataOut);

    let Info = CryptoJS.AES.encrypt(JSON.stringify(DataOut), 'SecretKeyIn@123');
    Info = Info.toString();
    this.Loader = true;
    this.PurchaseBill_Service.PurchaseBill_Yield_Update({'Info': Info }).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      this.Loader = false;
      this.bsModalRef.hide();
      if (response['status'] === 200 && ResponseData['Status'] ) {
        this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Yield Update successfully' });
      } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
         this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
      } else if (response['status'] === 401 && !ResponseData['Status']) {
         this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
      } else {
         this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Customer Data Getting Error!, But not Identify!' });
      }
    });

  }
}
