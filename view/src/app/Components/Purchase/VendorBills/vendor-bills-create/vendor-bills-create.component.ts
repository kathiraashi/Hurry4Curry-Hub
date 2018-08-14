import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-bills-create',
  templateUrl: './vendor-bills-create.component.html',
  styleUrls: ['./vendor-bills-create.component.css']
})
export class VendorBillsCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }
}
