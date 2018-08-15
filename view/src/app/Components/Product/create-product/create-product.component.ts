import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
Active_Tab = 'Product_Varients';

_Varients: any[] = ['Varients1', 'Varients2', 'Varients3', 'Varients4'];
_Customers: any[] = ['Customer1', 'Customer2', 'Customer3', 'Customer4'];
_Locations: any[] = ['Location1', 'Location2', 'Location3', 'Location4'];
  constructor() { }

  ngOnInit() {
  }
Active_Tab_Change(name) {
  this.Active_Tab = name;
}
}
