import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-franchisee-payments',
  templateUrl: './create-franchisee-payments.component.html',
  styleUrls: ['./create-franchisee-payments.component.css']
})
export class CreateFranchiseePaymentsComponent implements OnInit {
  Active_Tab = 'Bank';

  _InvoiceNo: any[] = ['IVC123', 'IVC355' , 'IVC768', 'IVC465'];
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }
}
