import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendor-payments-create',
  templateUrl: './vendor-payments-create.component.html',
  styleUrls: ['./vendor-payments-create.component.css']
})
export class VendorPaymentsCreateComponent implements OnInit {
Active_Tab = 'Bank';

_BillNo: any[] = ['Bill123', 'Bill355' , 'Bill768', 'Bill465'];
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
