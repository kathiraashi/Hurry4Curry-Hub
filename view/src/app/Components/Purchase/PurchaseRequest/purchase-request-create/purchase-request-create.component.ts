import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-purchase-request-create',
  templateUrl: './purchase-request-create.component.html',
  styleUrls: ['./purchase-request-create.component.css']
})
export class PurchaseRequestCreateComponent implements OnInit {
  Active_Tab = 'Product_Details';

   constructor() { }

   ngOnInit() {
   }
   Active_Tab_Change(name) {
     this.Active_Tab = name;
   }

}
