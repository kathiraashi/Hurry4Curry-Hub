import { Component, OnInit } from '@angular/core';


import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { AdminService } from './../../../../services/Admin/admin.service';
import { Router } from '@angular/router';
import { DeliverProductsService} from './../../../../services/DeliverProducts/deliver-products.service';
@Component({
  selector: 'app-list-deliver-products',
  templateUrl: './list-deliver-products.component.html',
  styleUrls: ['./list-deliver-products.component.css']
})
export class ListDeliverProductsComponent implements OnInit {
  User_Id: any;
  _List: any[] = [];
  ActionIndex: any;

   constructor(
    public DeliverProducts_Service: DeliverProductsService,
    public Service: AdminService,
    public Toaster: ToasterServiceService,
    public router: Router) {
      this.User_Id = this.Service.GetUserInfo()['_id'];
    }

   ngOnInit() {
    const Data = { 'User_Id': this.User_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    this.DeliverProducts_Service.DeliverProducts_List({'Info': Info}).subscribe(response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status'] ) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this._List = DecryptedData;
          console.log(this._List);
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
  }
   View(_index) {
    this.router.navigate(['/View_Deliver_Products', this._List[this.ActionIndex]['_id']]);
  }

}
