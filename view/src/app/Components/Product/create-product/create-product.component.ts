import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, AbstractControl, FormBuilder, FormArray } from '@angular/forms';
import { Router } from '@angular/router';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { AdminService } from './../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../services/common-services/Toaster-Service/toaster-service.service';
import { ProductService } from './../../../services/Product/product.service';
import { ProductsService } from './../../../services/Settings/products.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  Active_Tab = 'Product_Variants';

  _Variants: any[] = [];
  _UnitOfMeasures: any[] = [];
  _Filtered_Variants: any[] = [];


  Form: FormGroup;
  Variants_List;
  User_Id;

  constructor(
    public Service: AdminService,
    private Product_Service: ProductService,
    private Settings_Service: ProductsService,
    private Toaster: ToasterServiceService,
    public router: Router,
    public form_builder: FormBuilder
  ) {
    this.User_Id = this.Service.GetUserInfo()['_id'];
    const Data = { User_Id : this.User_Id };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    // Get Variants List
    this.Settings_Service.ProductVariant_SimpleList({'Info': Info}).subscribe( response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status'] ) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this._Variants = DecryptedData;
          this._Filtered_Variants = DecryptedData;
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
       } else {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Variants Simple List Getting Error!, But not Identify!' });
       }
    });
    this.Settings_Service.ProductUnitOfMeasure_SimpleList({'Info': Info}).subscribe( response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status'] ) {
          const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
          const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
          this._UnitOfMeasures = DecryptedData;
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
       } else {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Unit Of Measures Simple List Getting Error!, But not Identify!' });
       }
    });
  }

  ngOnInit() {
    this.Form = new FormGroup({
      Name: new FormControl('', { validators: Validators.required,
                                 asyncValidators: [this.Name_AsyncValidate.bind(this)],
                                 updateOn: 'blur' } ),
      Item: new FormControl(''),
      Hsn_Code: new FormControl('', Validators.required),
      UnitOfMeasure: new FormControl(null, Validators.required),
      Description: new FormControl(''),
      CreatedBy: new FormControl('Admin'),
      User_Id: new FormControl(this.User_Id, Validators.required),
      Variants_List: this.form_builder.array([])
   });
  }
  Name_AsyncValidate( control: AbstractControl ) {
    const Data = { Name: control.value, User_Id: this.User_Id  };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    return this.Product_Service.ProductGroupName_AsyncValidate({'Info': Info}).pipe(map( response => {
       const ReceivingData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
          return null;
       } else {
          return { UserName_NotAvailable: true};
       }
    }));
 }

 Variants_FormArray(): FormGroup {
  return new FormGroup({
     Attribute: new FormControl(null, Validators.required),
     Attribute_Values: new FormControl({value: '', disabled: true}, Validators.required)
  });
}

AddVariant() {
  const Group = this.Form.get('Variants_List') as FormArray;
  Group.push(this.Variants_FormArray());
}

Remove_Variant(index: number) {
  const control = <FormArray>this.Form.controls['Variants_List'];
  control.removeAt(index);
}


VariantChange(_index) {
  const status = this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute']['value'];
  if (status !== null) {
     this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute_Values'].enable();
  } else {
     this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute_Values'].disable();
     this.Form.controls['Variants_List']['controls'][_index]['controls']['Attribute_Values'].setValue(null);
  }
}

Submit() {
  if (this.Form.valid) {
     let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.getRawValue()), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Product_Service.Product_Create({ 'Info': Info }).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ResponseData['Status'] ) {
           this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'New Product Successfully Created' });
           this.router.navigate(['/List_Product']);
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Creating Product Getting Error!, But not Identify!' });
        }
     });
  }
}
  Active_Tab_Change(name) {
    this.Active_Tab = name;
 }
}
