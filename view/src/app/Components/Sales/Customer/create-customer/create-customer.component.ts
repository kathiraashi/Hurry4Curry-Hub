import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { CustomerService } from './../../../../services/Sales/Customer/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  AllCountry: any[];
  AllStateOfCountry: any[];
  AllCityOfState:  any[];

  Loader: Boolean = false;

  Form: FormGroup;

  User_Id;

  constructor(
    public Service: AdminService,
    private Toaster: ToasterServiceService,
    public Customer_Service: CustomerService,
    public router: Router
  ) {
    this.User_Id = this.Service.GetUserInfo()['_id'];
    const Data = { 'User_Id' : this.User_Id };
        let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
        Info = Info.toString();
        // Get Country List
       this.Service.Country_List({'Info': Info}).subscribe( response => {
          const ResponseData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this.AllCountry = DecryptedData;
          } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
             this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
          } else if (response['status'] === 401 && !ResponseData['Status']) {
             this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
          } else {
             this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Country Simple List Getting Error!, But not Identify!' });
          }
       });
  }

  ngOnInit() {
    this.Form = new FormGroup({
      User_Id: new FormControl(this.User_Id, Validators.required),
      Name: new FormControl('', Validators.required),
     // User_Password: new FormControl('', Validators.required),
      Phone: new FormControl('', {  validators: Validators.required,
                                    asyncValidators: [this.Phone_AsyncValidate.bind(this)],
                                    updateOn: 'blur' } ),
      Email: new FormControl(''),
      Website: new FormControl(''),
      GSTNo: new FormControl(''),
      Address: new FormControl('')

   });
  }

  // UserName_AsyncValidate( control: AbstractControl ) {
  //     const Data = { User_Name: control.value, User_Id: this.User_Id  };
  //     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
  //     Info = Info.toString();
  //     return this.Customer_Service.Customer_UserName_AsyncValidate({'Info': Info}).pipe(map( response => {
  //        const ReceivingData = JSON.parse(response['_body']);
  //        if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
  //           return null;
  //        } else {
  //           return { UserName_NotAvailable: true};
  //        }
  //     }));
  //  }

   Phone_AsyncValidate( control: AbstractControl ) {
      const Data = { Phone: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Customer_Service.Customer_PhoneNumber_AsyncValidate({'Info': Info}).pipe(map( response => {
         const ReceivingData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
            return null;
         } else {
            return { Phone_NotAvailable: true};
         }
      }));
   }
 Submit() {
   console.log(this.Form);
   console.log(this.Form.value);
    if (this.Form.valid && !this.Loader) {
      this.Loader = true;
       let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
       Info = Info.toString();
       this.Customer_Service.Customer_Create({ 'Info': Info }).subscribe( response => {
          const ResponseData = JSON.parse(response['_body']);
          this.Loader = false;
          if (response['status'] === 200 && ResponseData['Status'] ) {
             this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'New Customer Successfully Created' });
             this.router.navigate(['/List_Customer']);
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



}
