import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {
  Active_Tab = 'Product_Variants';

  _Variants: any[] = ['Variant One', 'Variant Two', 'Variant Three', 'Variant Four', 'Variant Five'];

  _Segments: any[] = ['Hub', 'Franchises'];

  _Locations: any[] = ['Location One', 'Location Two', 'Location Three', 'Location Four', 'Location Five'];
  constructor() { }

  ngOnInit() {
  }
  Active_Tab_Change(name) {
    this.Active_Tab = name;
 }
}
