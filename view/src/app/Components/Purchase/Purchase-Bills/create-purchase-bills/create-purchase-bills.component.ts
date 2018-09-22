import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder, AbstractControl  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';


import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { ProductService } from './../../../../services/Product/product.service';
import { PurchaseBillService } from './../../../../services/PurchaseBill/purchase-bill.service';
import { SupplierService } from './../../../../services/Supplier/supplier.service';
import { log } from 'util';


@Component ({
  selector: 'app-create-purchase-bills',
  templateUrl: './create-purchase-bills.component.html',
  styleUrls: ['./create-purchase-bills.component.css']
})
export class CreatePurchaseBillsComponent implements OnInit {
  Active_Tab = 'Product_Details';

  Form;
  StockData;
  _SupplierList: any[] = [];
  _ProductList: any[] = [];
  selectedOption: string;
  _temProductList: any[] = [];
  User_Id: any;
  Supplier_Id: any;
  price: any;
  Price_Value: number;
  Quantity_Value: number;
  Total_Value;
  items: FormArray;
  referenceInput;
  today: number = Date.now();
  constructor(private Toaster: ToasterServiceService,
    public Product_Service: ProductService,
    public PurchaseBill_Service: PurchaseBillService,
    public Supplier_Service: SupplierService,
    public Service: AdminService,
    public router: Router,
    private formBuilder: FormBuilder,
    private active_route: ActivatedRoute) { this.User_Id = this.Service.GetUserInfo()['_id']; }

  ngOnInit() {
    this.Form = new FormGroup({
      User_Id: new FormControl(this.User_Id, Validators.required),
      Supplier_Id: new FormControl(null, Validators.required),
      PurchaseBill_RefNo: new FormControl(null, { asyncValidators: [this.PurchaseBillRefNo_AsyncValidate.bind(this)], updateOn: 'blur'}),
      PurchaseBill_Date: new FormControl(new Date(), [Validators.required]),
      items: this.formBuilder.array([this.createItems()]),
      Net_Amount: new FormControl(null),
      Date: new FormControl(new Date())
    });
     // Get Supplier List
     const Data = {User_Id : this.User_Id };
     let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
     Info = Info.toString();
     this.Supplier_Service.Supplier_List({'Info': Info}).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ResponseData['Status'] ) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this._SupplierList = DecryptedData;
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Supplier List Getting Error!, But not Identify!' });
        }
     });
    // Get Product List
    const PData = { User_Id: this.User_Id };
    let Info_P = CryptoJS.AES.encrypt(JSON.stringify(PData), 'SecretKeyIn@123');
    Info_P = Info_P.toString();
    this.Product_Service.Product_List({ 'Info': Info_P }).subscribe(response => {
      const ResponseData = JSON.parse(response['_body']);
      if (response['status'] === 200 && ResponseData['Status']) {
        const CryptoBytes = CryptoJS.AES.decrypt(
          ResponseData['Response'],
          'SecretKeyOut@123'
        );
        const DecryptedData = JSON.parse(
          CryptoBytes.toString(CryptoJS.enc.Utf8)
        );
        this._ProductList = DecryptedData;
        this._temProductList = this._ProductList;
      } else if (
        response['status'] === 400 ||
        (response['status'] === 417 && !ResponseData['Status'])
      ) {
        this.Toaster.NewToastrMessage({
          Type: 'Error',
          Message: ResponseData['Message']
        });
      } else if (response['status'] === 401 && !ResponseData['Status']) {
        this.Toaster.NewToastrMessage({
          Type: 'Error',
          Message: ResponseData['Message']
        });
      } else {
        this.Toaster.NewToastrMessage({
          Type: 'Error',
          Message:
            'Product With Variants List Getting Error!, But not Identify!'
        });
      }
    });

  }
  // Purchase Bill Ref.No unique
  PurchaseBillRefNo_AsyncValidate( control: AbstractControl ) {
    const Data = { PurchaseBill_RefNo: control.value, User_Id: this.User_Id  };
    let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
    Info = Info.toString();
    return this.PurchaseBill_Service.PurchaseBill_RefNo_AsyncValidate({'Info': Info}).pipe(map( response => {
       const ReceivingData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ReceivingData['Status'] && ReceivingData['Available']) {
          return null;
       } else {
          return { PurchaseBill_RefNo_NotAvailable: true};
       }
    }));
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
 }
 // Form Array
 createItems(): FormGroup {
  return this.formBuilder.group({
   Product: new FormControl(null, [Validators.required]),
   Price: new FormControl(null, [Validators.required]),
   Quantity: new FormControl(null, [Validators.required]),
   Product_Total: new FormControl(null),
  });
 }
 // add items to bill
 addItem(): void {
  this.items = this.Form.get('items') as FormArray;
  this.items.push(this.createItems());
  this.FilterProduct();
 }
 // Filter products
FilterProduct() {
  const selectedProduct = [];
  this.Form.controls['items'].value.map(obj => {
    if (obj.Product !== null) {
      selectedProduct.push(obj.Product._id);
    }
  });
  this._temProductList = this._ProductList.filter(obj => !selectedProduct.includes(obj._id));
}
 // tab or mouse pointer function for product x quantity
 onTabQuantity(_index) {
  const Price_Value: number = this.Form.controls['items'].controls[_index].controls.Price.value;
  const Quantity_Value: number = this.Form.controls['items'].controls[_index].controls.Quantity.value;
  const Total_Val = Price_Value * Quantity_Value;

  this.Form.controls['items'].controls[_index].controls.Product_Total.setValue(Total_Val);
  const length = this.Form.controls['items'].length;
  let finalTotal = 0;

  for (let index = 0; index < length; index++) {
    const total = this.Form.controls['items'].controls[index].controls.Product_Total.value;
    finalTotal = finalTotal + total;
  }
  this.Total_Value = finalTotal;
  this.Form.controls['Net_Amount'].setValue(this.Total_Value);
}


Submit() {
  console.log(this.Form.value);
  if (this.Form.valid) {
    let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
    Info = Info.toString();
    this.PurchaseBill_Service.PurchaseBill_Create({ 'Info': Info }).subscribe( response => {
       const ResponseData = JSON.parse(response['_body']);
       if (response['status'] === 200 && ResponseData['Status'] ) {
          this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Purchase Bill Successfully Created' });
          this.router.navigate(['/Purchase_Bills_List']);
       } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else if (response['status'] === 401 && !ResponseData['Status']) {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
       } else {
          this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Creating Purchase Bill Getting Error!, But not Identify!' });
       }
    });
 }
}

Delete(_index) {
  this.items.removeAt(_index);
  this.FilterProduct();
}
// Datepicker keyup and keydown event false
DoNothing() {
  return false;
}


}
