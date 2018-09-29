import { Component, OnInit } from '@angular/core';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { FranshiseOrderService } from './../../../../services/FranchiseeOrder/franshise-order.service';
import { AdminService } from './../../../../services/Admin/admin.service';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-view-franchisee-order',
  templateUrl: './view-franchisee-order.component.html',
  styleUrls: ['./view-franchisee-order.component.css']
})
export class ViewFranchiseeOrderComponent implements OnInit {
  User_Id: any;
  _Data;
  FranchiseeOrder_Id: any;
  Loader: Boolean = false;

  constructor(
    public FranshiseOrder_Service: FranshiseOrderService,
    public Service: AdminService,
    public Toaster: ToasterServiceService,
    private active_route: ActivatedRoute,
    public router: Router) {
      this.User_Id = this.Service.GetUserInfo()['_id'];
    }

  ngOnInit() {
    this.active_route.url.subscribe((u) => {
      this.FranchiseeOrder_Id = this.active_route.snapshot.params['FranchiseeOrder_Id'];
      const Data = { 'User_Id': this.User_Id, 'FranchiseeOrder_Id': this.FranchiseeOrder_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Loader = true;
      this.FranshiseOrder_Service.FranchiseePurchaseOrder_View({'Info': Info}).subscribe(response => {
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
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Error in getting data!, But not Identify!' });
       }
      });
    });
  }

  CreateDeliver() {
    const Data = { 'User_Id': this.User_Id, 'FranchiseeOrder_Id': this.FranchiseeOrder_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    this.Loader = true;
    this.FranshiseOrder_Service.FranchiseePurchaseOrder_CreateDeliver({'Info': Info}).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      this.Loader = false;
      if (response['status'] === 200 && ResponseData['Status'] ) {
        this.router.navigate(['/List_Franchisee_Order']);
        this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Successfully Deliver Create' });
     } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
     } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
     } else {
        this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Error in getting data!, But not Identify!' });
     }
    });
  }

}
