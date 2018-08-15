import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
Active_Tab = 'Product_Details';

_Names: any[] = ['Name one', 'Name Two', 'Name Three', 'Name Four'];
_ContactPersons: any[] = ['Person-1', 'Person-2', 'Person-3', 'Person-4'];
_Employees: any[] = ['Employee1', 'Employee2', 'Employee3', 'Employee4'];


  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
  }

}
