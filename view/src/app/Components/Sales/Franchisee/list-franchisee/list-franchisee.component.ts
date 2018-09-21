import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { FranchiseeService } from './../../../../services/Sales/Franchisee/franchisee.service';
import { AdminService } from './../../../../services/Admin/admin.service';

@Component({
  selector: 'app-list-franchisee',
  templateUrl: './list-franchisee.component.html',
  styleUrls: ['./list-franchisee.component.css']
})
export class ListFranchiseeComponent implements OnInit {

   User_Id;

   ActionIndex: number;

   Loader: Boolean = true;

   _List: any[] = [];

   constructor(  private Toaster: ToasterServiceService,
      public Franchisee_Service: FranchiseeService,
      public Service: AdminService,
      public router: Router) {
         this.User_Id = this.Service.GetUserInfo()['_id'];
       }

  ngOnInit() {
     // Get Franchisee List
     const Data = {'User_Id' : this.User_Id };
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Loader = true;
     this.Franchisee_Service.SalesFranchisee_List({'Info': Info}).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        this.Loader = false;
        if (response['status'] === 200 && ResponseData['Status'] ) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this._List = DecryptedData;
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Franchisee List Getting Error!, But not Identify!' });
        }
     });
  }

  SetActionId(_index) {
   this.ActionIndex = _index;
  }

  Edit() {
     this.router.navigate(['/Edit_Franchisee', this._List[this.ActionIndex]['_id'] ]);
  }

  View() {
     this.router.navigate(['/View_Franchisee', this._List[this.ActionIndex]['_id'] ]);
  }

}
