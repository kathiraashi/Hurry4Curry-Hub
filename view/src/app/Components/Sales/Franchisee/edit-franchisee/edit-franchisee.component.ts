import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { FranchiseeService} from './../../../../services/Sales/Franchisee/franchisee.service';


@Component({
  selector: 'app-edit-franchisee',
  templateUrl: './edit-franchisee.component.html',
  styleUrls: ['./edit-franchisee.component.css']
})
export class EditFranchiseeComponent implements OnInit {

   AllCountry: any[];
   AllStateOfCountry: any[];
   AllCityOfState:  any[];

   ShopFloorAllCountry: any[];
   ShopFloorAllStateOfCountry: any[];
   ShopFloorAllCityOfState:  any[];

   ShopFloor_State;

   Loader: Boolean = true;
   _Data: Object = {};
   Franchisee_Id;

   Form: FormGroup;

   User_Id;


   constructor(
      public Service: AdminService,
      private Toaster: ToasterServiceService,
      public Franchisee_Service: FranchiseeService,
      private active_route: ActivatedRoute,
      public router: Router
   ) {
      this.User_Id = this.Service.GetUserInfo()['_id'];
      this.active_route.url.subscribe((u) => {
         this.Franchisee_Id = this.active_route.snapshot.params['Franchisee_Id'];
         const Data = {'User_Id' : this.User_Id, Franchisee_Id: this.Franchisee_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Loader = true;
         this.Franchisee_Service.SalesFranchisee_View({'Info': Info}).subscribe( response => {
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
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Franchisee Data Getting Error!, But not Identify!' });
            }
         });
      });
      const Data_1 = { 'User_Id' : this.User_Id };
      let Info_1 = CryptoJS.AES.encrypt(JSON.stringify(Data_1), 'SecretKeyIn@123');
      Info_1 = Info_1.toString();
      // Get Country List
      this.Service.Country_List({'Info': Info_1}).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
            const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
            this.AllCountry = DecryptedData;
            this.ShopFloorAllCountry = DecryptedData;
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
         Franchisee_Id: new FormControl(this.Franchisee_Id, Validators.required),
         Name: new FormControl('', Validators.required),
         User_Name: new FormControl('', {  validators: Validators.required,
                                          asyncValidators: [this.UserName_AsyncValidate.bind(this)],
                                          updateOn: 'blur' } ),
         Phone: new FormControl('', {  validators: Validators.required,
                                       asyncValidators: [this.Phone_AsyncValidate.bind(this)],
                                       updateOn: 'blur' } ),
         Email: new FormControl('', Validators.required),
         Website: new FormControl(''),
         GSTNo: new FormControl(''),
         BillingStreet: new FormControl('', Validators.required),
         BillingArea: new FormControl('', Validators.required),
         BillingCountry: new FormControl(null, Validators.required),
         BillingState: new FormControl(null, Validators.required),
         BillingCity: new FormControl(null, Validators.required),
         BillingZipCode: new FormControl('', Validators.required),
         SameAddresses: new FormControl(false),
         ShopFloorStreet: new FormControl('', Validators.required),
         ShopFloorArea: new FormControl('', Validators.required),
         ShopFloorCountry: new FormControl(null, Validators.required),
         ShopFloorState: new FormControl(null, Validators.required),
         ShopFloorCity: new FormControl(null, Validators.required),
         ShopFloorZipCode: new FormControl('', Validators.required),
      });
   }

   SetFormValues() {
      this.Form.controls['Franchisee_Id'].setValue(this.Franchisee_Id);
      this.Form.controls['Name'].setValue(this._Data['Name']);
      this.Form.controls['User_Name'].setValue(this._Data['User_Name']);
      this.Form.controls['Phone'].setValue(this._Data['Phone']);
      this.Form.controls['Email'].setValue(this._Data['Email']);
      this.Form.controls['Website'].setValue(this._Data['Website']);
      this.Form.controls['GSTNo'].setValue(this._Data['GSTNo']);
      this.Form.controls['BillingStreet'].setValue(this._Data['BillingAddress']['Street']);
      this.Form.controls['BillingArea'].setValue(this._Data['BillingAddress']['Area']);
      this.Form.controls['BillingCountry'].setValue(this._Data['BillingAddress']['Country']);
      this.Form.controls['BillingState'].setValue(this._Data['BillingAddress']['State']);
      this.Form.controls['BillingCity'].setValue(this._Data['BillingAddress']['City']);
      this.Form.controls['BillingZipCode'].setValue(this._Data['BillingAddress']['ZipCode']);
      this.Form.controls['SameAddresses'].setValue(this._Data['SameAddresses']);
      if (!this._Data['SameAddresses']) {
            this.Form.controls['ShopFloorStreet'].setValue(this._Data['ShopFloorAddress']['Street']);
            this.Form.controls['ShopFloorArea'].setValue(this._Data['ShopFloorAddress']['Area']);
            this.Form.controls['ShopFloorCountry'].setValue(this._Data['ShopFloorAddress']['Country']);
            this.Form.controls['ShopFloorState'].setValue(this._Data['ShopFloorAddress']['State']);
            this.Form.controls['ShopFloorCity'].setValue(this._Data['ShopFloorAddress']['City']);
            this.Form.controls['ShopFloorZipCode'].setValue(this._Data['ShopFloorAddress']['ZipCode']);
      } else {
         this.SameAddresses_Change();
      }
   }

   UserName_AsyncValidate( control: AbstractControl ) {
      const Data = { User_Name: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Franchisee_Service.SalesFranchisee_UserName_AsyncValidate({'Info': Info}).pipe(map( response => {
         if (this._Data['User_Name'] === control.value) {
            return null;
         } else {
            const ReceivingData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
               return null;
            } else {
               return { UserName_NotAvailable: true};
            }
         }
      }));
   }

   Phone_AsyncValidate( control: AbstractControl ) {
      const Data = { Phone: control.value, User_Id: this.User_Id  };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      return this.Franchisee_Service.SalesFranchisee_PhoneNumber_AsyncValidate({'Info': Info}).pipe(map( response => {
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

   BillingCountry_Change() {
      const SelectedCountry = this.Form.controls['BillingCountry'].value;
      this.Form.controls['BillingState'].setValue(null);
      this.Form.controls['BillingCity'].setValue(null);
      if (SelectedCountry !== null && typeof SelectedCountry === 'object' && Object.keys(SelectedCountry).length > 0) {
         const Data = {Country_Id: SelectedCountry._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get State List
         this.Service.State_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.AllStateOfCountry = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
            }
         });
      }
   }

   BillingState_Change() {
      const SelectedState = this.Form.controls['BillingState'].value;
      this.Form.controls['BillingCity'].setValue(null);
      if ( SelectedState !== null && typeof SelectedState === 'object' && Object.keys(SelectedState).length > 0) {
         const Data = {State_Id: SelectedState._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get City List
         this.Service.City_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.AllCityOfState = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
            }
         });
      }
   }

   ShopFloorCountry_Change() {
      const SelectedCountry = this.Form.controls['ShopFloorCountry'].value;
      if (!this.Form.controls['SameAddresses'].value && SelectedCountry !== null && typeof SelectedCountry === 'object' && Object.keys(SelectedCountry).length > 0) {
         const Data = {Country_Id: SelectedCountry._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get State List
         this.Service.State_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.ShopFloorAllStateOfCountry = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Country Based States List Getting Error!, But not Identify!' });
            }
         });
      }
      if (!this.Form.controls['SameAddresses'].value) {
         this.Form.controls['ShopFloorState'].setValue(null);
         this.Form.controls['ShopFloorCity'].setValue(null);
      }
   }

   ShopFloorState_Change() {
      const SelectedState = this.Form.controls['ShopFloorState'].value;
      if ( !this.Form.controls['SameAddresses'].value && SelectedState !== null && typeof SelectedState === 'object' && Object.keys(SelectedState).length > 0) {
         const Data = {State_Id: SelectedState._id, 'User_Id' : this.User_Id };
         let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
         Info = Info.toString();
         // Get City List
         this.Service.City_List({'Info': Info}).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
               const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
               this.ShopFloorAllCityOfState = DecryptedData;
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
            } else {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'State Based City List Getting Error!, But not Identify!' });
            }
         });
      }
      if (!this.Form.controls['SameAddresses'].value) {
         this.Form.controls['ShopFloorCity'].setValue(null);
      }
   }

   SameAddresses_Change() {
      const Status = this.Form.controls['SameAddresses'].value;
      if (Status) {
         this.Form.controls['ShopFloorStreet'].setValue(this.Form.controls['BillingStreet'].value);
         this.Form.controls['ShopFloorArea'].setValue(this.Form.controls['BillingArea'].value);
         this.Form.controls['ShopFloorCountry'].setValue(this.Form.controls['BillingCountry'].value);
         this.ShopFloorAllStateOfCountry = this.AllStateOfCountry;
         setTimeout(() => {
            this.Form.controls['ShopFloorState'].setValue(this.Form.controls['BillingState'].value);
         }, 100);
         this.ShopFloorAllCityOfState = this.AllCityOfState;
         setTimeout(() => {
            this.Form.controls['ShopFloorCity'].setValue(this.Form.controls['BillingCity'].value);
         }, 100);
         this.Form.controls['ShopFloorZipCode'].setValue(this.Form.controls['BillingZipCode'].value);
         setTimeout(() => {
            this.Form.controls['ShopFloorStreet'].disable();
            this.Form.controls['ShopFloorArea'].disable();
            this.Form.controls['ShopFloorCountry'].disable();
            this.Form.controls['ShopFloorState'].disable();
            this.Form.controls['ShopFloorCity'].disable();
            this.Form.controls['ShopFloorZipCode'].disable();
         }, 100);
      } else {
         this.Form.controls['ShopFloorStreet'].enable();
         this.Form.controls['ShopFloorArea'].enable();
         this.Form.controls['ShopFloorCountry'].enable();
         this.Form.controls['ShopFloorState'].enable();
         this.Form.controls['ShopFloorCity'].enable();
         this.Form.controls['ShopFloorZipCode'].enable();
         this.Form.controls['ShopFloorStreet'].setValue('');
         this.Form.controls['ShopFloorArea'].setValue('');
         this.Form.controls['ShopFloorCountry'].setValue(null);
         this.Form.controls['ShopFloorState'].setValue(null);
         this.Form.controls['ShopFloorCity'].setValue(null);
         this.Form.controls['ShopFloorZipCode'].setValue('');
      }
   }

   BillingAddressAny_Changes() {
      const Status = this.Form.controls['SameAddresses'].value;
      if (Status) {
         this.Form.controls['SameAddresses'].setValue(false);
         this.Form.controls['ShopFloorStreet'].enable();
         this.Form.controls['ShopFloorArea'].enable();
         this.Form.controls['ShopFloorCountry'].enable();
         this.Form.controls['ShopFloorState'].enable();
         this.Form.controls['ShopFloorCity'].enable();
         this.Form.controls['ShopFloorZipCode'].enable();
         this.Form.controls['ShopFloorStreet'].setValue('');
         this.Form.controls['ShopFloorArea'].setValue('');
         this.Form.controls['ShopFloorCountry'].setValue(null);
         this.Form.controls['ShopFloorState'].setValue(null);
         this.Form.controls['ShopFloorCity'].setValue(null);
         this.Form.controls['ShopFloorZipCode'].setValue('');
      }
   }

   Submit() {
      if (this.Form.valid) {
         let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
         Info = Info.toString();
         this.Franchisee_Service.SalesFranchisee_Update({ 'Info': Info }).subscribe( response => {
            const ResponseData = JSON.parse(response['_body']);
            if (response['status'] === 200 && ResponseData['Status'] ) {
               this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Franchisee Details Successfully Updated' });
               this.router.navigate(['/List_Franchisee']);
            } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else if (response['status'] === 401 && !ResponseData['Status']) {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
            } else {
               this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Updating Franchisee Getting Error!, But not Identify!' });
            }
         });
      }

   }

}
