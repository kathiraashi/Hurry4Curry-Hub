import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, FormBuilder  } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import * as CryptoJS from 'crypto-js';
import { map } from 'rxjs/operators';

import { AdminService } from './../../../../services/Admin/admin.service';
import { ToasterServiceService } from './../../../../services/common-services/Toaster-Service/toaster-service.service';
import { CustomerService } from './../../../../services/Sales/Customer/customer.service';
import { ProductService } from './../../../../services/Product/product.service';
import { StockService } from './../../../../services/Stock/stock.service';
import { BillService } from './../../../../services/Bill/bill.service';
import { log } from 'util';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
   Active_Tab = 'Product_Details';
   Form;
   _BillList: any[] = [];
   _CustomerList: any[] = [];
   _ProductList: any[] = [];
   _temProductList: any[] = [];
   selectedOption: string;
   options = [{ paymentType: 'Cash', value: 1},
              { paymentType: 'Credit', value: 2},
              { paymentType: 'Debit', value: 3}];
   User_Id: any;
   Customer_Id: any;
   price: any;
  Price_Value: number;
  Quantity_Value: number;
  Total_Value;
  items: FormArray;
  bsModalRef: BsModalRef;
  referenceInput;
  today: number = Date.now();

   constructor(private Toaster: ToasterServiceService,
    public Customer_Service: CustomerService,
    public Product_Service: ProductService,
    public Stock_Service: StockService,
    public Bill_Service: BillService,
    public Service: AdminService,
    public router: Router,
    private formBuilder: FormBuilder,
    public bsModalService: BsModalService,
    private active_route: ActivatedRoute) {
      this.User_Id = this.Service.GetUserInfo()['_id'];
    }

   ngOnInit() {
     this.Form = new FormGroup({
       User_Id: new FormControl(this.User_Id, Validators.required),
       CustomerName: new FormControl(null, Validators.required),
       CustomerEmail: new FormControl(null),
       BillNumber: new FormControl(null),
       BillDate: new FormControl(null, [Validators.required]),
       items: this.formBuilder.array([this.createItems()]),
       Net_Amount: new FormControl(null),
       PaymentType: new FormControl(null, Validators.required),
       Date: new FormControl(new Date())
     });
     // get Customer list
     const Data = { 'User_Id' : this.User_Id };
      let Info = CryptoJS.AES.encrypt(JSON.stringify(Data), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Customer_Service.Customer_List({'Info': Info}).subscribe( response => {
        const ResponseData = JSON.parse(response['_body']);
        if (response['status'] === 200 && ResponseData['Status'] ) {
           const CryptoBytes  = CryptoJS.AES.decrypt(ResponseData['Response'], 'SecretKeyOut@123');
           const DecryptedData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));
           this._CustomerList = DecryptedData;
           this._CustomerList.map((CLObj) => { CLObj.Customer_Search = CLObj.Name + ' (Ph: ' + CLObj.Phone + ')'; return CLObj; });
        } else if (response['status'] === 400 || response['status'] === 417 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: ResponseData['Message'] });
        } else if (response['status'] === 401 && !ResponseData['Status']) {
           this.Toaster.NewToastrMessage({ Type: 'Error',  Message: ResponseData['Message'] });
        } else {
           this.Toaster.NewToastrMessage({ Type: 'Error', Message: 'Customer List Getting Error!, But not Identify!' });
        }
     });

     // Get Product List
    const PData = { User_Id: this.User_Id };
    let Info_P = CryptoJS.AES.encrypt(JSON.stringify(PData), 'SecretKeyIn@123');
    Info_P = Info_P.toString();
    this.Stock_Service.Stock_List({ 'Info': Info_P }).subscribe(response => {
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
        this._temProductList.map((temObj) => {temObj.Product_Search = temObj.Product_Id['Name_withAttribute'] + ' (Available stock:' + temObj.Current_Quantity + ')'; return temObj; });
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

  }
  // Filter the selected product
  FilterProduct() {
    const selectedProduct = [];
    this.Form.controls['items'].value.map(obj => {
      if (obj.Product !== null) {
        selectedProduct.push(obj.Product._id);
      }
    });
    this._temProductList = this._ProductList.filter(obj => !selectedProduct.includes(obj._id));
  }

   Active_Tab_Change(name) {
      this.Active_Tab = name;
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

  Next(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template);
  }
  onSelectCustomer(selectedCustomer: any) {
    this.Form.controls['CustomerEmail'].setValue(selectedCustomer['Email']);
  }
  onChange(paymentMethod: any) {
    if (paymentMethod['value'] === 3) {
      this.Form.addControl('ReferenceNumber', new FormControl(null, Validators.required));
      this.referenceInput = true;
    } else {
      this.Form.removeControl('ReferenceNumber');
      this.referenceInput = false;
    }
  }
  Submit() {
    if (this.Form.valid) {
      let Info = CryptoJS.AES.encrypt(JSON.stringify(this.Form.value), 'SecretKeyIn@123');
      Info = Info.toString();
      this.Bill_Service.Bill_Create({ 'Info': Info }).subscribe( response => {
         const ResponseData = JSON.parse(response['_body']);
         if (response['status'] === 200 && ResponseData['Status'] ) {
            this.Toaster.NewToastrMessage({ Type: 'Success', Message: 'Bill Successfully Created' });
            this.router.navigate(['/List_Bill']);
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

  Delete(_index) {
    this.items.removeAt(_index);
    this.FilterProduct();
  }

  DoNothing() {
    return false;
  }
}
