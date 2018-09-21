import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { PurchaseBillService } from './../../../../services/PurchaseBill/purchase-bill.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { StockService } from './../../../../services/Stock/stock.service';

@Component({
  selector: 'app-view-receiveproducts',
  templateUrl: './view-receiveproducts.component.html',
  styleUrls: ['./view-receiveproducts.component.css']
})
export class ViewReceiveproductsComponent implements OnInit {
  User_Id;
  SupplierBill_Id;
  Loader: Boolean = true;
  _Data: Object = {};
  ButtonType;

  constructor( private Toaster: ToasterServiceService,
    public PurchaseBill_Service: PurchaseBillService,
    private active_route: ActivatedRoute,
    public router: Router,
    public Stock_Service: StockService,
    public Service: AdminService) { this.User_Id = this.Service.GetUserInfo()['_id']; }

  ngOnInit() {
    this.active_route.url.subscribe(() => {
      this.SupplierBill_Id = this.active_route.snapshot.params['SupplierBill_Id'];
      const Data = { 'User_Id': this.User_Id, SupplierBill_Id: this.SupplierBill_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.PurchaseBill_Service.PurchaseBill_View({'Info': Info}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         this.Loader = false;
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this._Data = DecryptedData;
         } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
         } else if (response['status'] === 401 && !ResponseData['Status']) {
            this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
         } else {
            this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Customer Data Getting Error!, But not Identify!' });
         }
      });
    });

  }

  UpdateStock() {
    console.log(this._Data);
    const Data = { 'User_Id': this.User_Id, 'SupplierBill_Id': this._Data['Supplier_Detail']._id};
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    this.PurchaseBill_Service.PurchaseBill_UpdateStock({'Info': Info}).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status'] ) {
        this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Bill Successfully Created' });
        this.router.navigate(['/List_Stock_Values']);
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
