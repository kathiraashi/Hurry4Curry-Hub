import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { CustomerService } from './../../../../services/Sales/Customer/customer.service';


@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {
User_Id;
Loader: Boolean = true;
_Data: Object = {};
Customer_Id;
Form: FormGroup;


  constructor(
    public Service: AdminService,
    private Toaster: ToasterServiceService,
    public Customer_Service: CustomerService,
    private active_route: ActivatedRoute,
    public router: Router
  ) {
    this.User_Id = this.Service.GetUserInfo()['_id'];
    this.active_route.url.subscribe((u) => {
       this.Customer_Id = this.active_route.snapshot.params['Customer_Id'];
       const Data = {'User_Id' : this.User_Id, Customer_Id: this.Customer_Id };
       let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
       Info = Info.toString();
       this.Loader = true;
       this.Customer_Service.Customer_View({'Info': Info}).subscribe( response => {
          const ResponseData = JSON.parse(response['_body']);
          this.Loader = false;
          if (response['status'] === 200 && ResponseData['Status'] ) {
             const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
             const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
             this._Data = DecryptedData;
             this.SetFormValues();
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

  ngOnInit() {
    this.Form = new FormGroup({
      User_Id: new FormControl(this.User_Id, Validators.required),
      Customer_Id: new FormControl(this.Customer_Id, Validators.required),
      Name: new FormControl('', Validators.required),
      Phone: new FormControl('', {  validators: Validators.required,
                                    asyncValidators: [this.Phone_AsyncValidate.bind(this)],
                                    updateOn: 'blur' } ),
      Email: new FormControl(''),
      GSTNo: new FormControl(''),
      Address: new FormControl('')
   });
  }

  SetFormValues() {
    this.Form.controls['Customer_Id'].setValue(this.Customer_Id);
    this.Form.controls['Name'].setValue(this._Data['Name']);
    this.Form.controls['Phone'].setValue(this._Data['Phone']);
    this.Form.controls['Email'].setValue(this._Data['Email']);
    this.Form.controls['GSTNo'].setValue(this._Data['GSTNo']);
    this.Form.controls['Address'].setValue(this._Data['Address']);
  }

  Phone_AsyncValidate( control: AbstractControl ) {
    const Data = { Phone: control.value, User_Id: this.User_Id  };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    return this.Customer_Service.Customer_PhoneNumber_AsyncValidate({'Info': Info}).pipe(map( response => {
       if (this._Data['Phone'] === control.value) {
          return null;
       } else {
          const ReceivingData = JSON.parse(response['_body']);
          if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
             return null;
          } else {
             return { Phone_NotAvailable: true};
          }
       }
    }));
 }

 Submit() {
  if (this.Form.valid) {
     let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Customer_Service.Customer_Update({ 'Info': Info }).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ResponseData['Status'] ) {
           this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Customer Details Successfully Updated' });
           this.router.navigate(['/List_Customer']);
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Updating Customer Getting Error!, But not Identify!' });
        }
     });
  }

}
}
