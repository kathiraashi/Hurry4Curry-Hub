import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-franchisee-payments',
  templateUrl: './create-franchisee-payments.component.html',
  styleUrls: ['./create-franchisee-payments.component.css']
})
export class CreateFranchiseePaymentsComponent implements OnInit {
  Active_Tab = 'Bank';

  _BillNo: any[] = ['Bill-123', 'Bill-355' , 'Bill-768', 'Bill-465'];
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }
}
