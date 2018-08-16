import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.css']
})
export class CreateBillComponent implements OnInit {
   Active_Tab = 'Product_Details';

   _Franchisee: any[] =  ['Franchisee One', 'Franchisee Two', ' Franchisee Three', 'Franchisee Four'];




   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
      this.Active_Tab = name;
   }

}
