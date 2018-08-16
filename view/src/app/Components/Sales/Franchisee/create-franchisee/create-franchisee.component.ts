import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-franchisee',
  templateUrl: './create-franchisee.component.html',
  styleUrls: ['./create-franchisee.component.css']
})
export class CreateFranchiseeComponent implements OnInit {

   _Countries: any[] = ['India', 'Australia', 'America', 'Japan'];
   _States: any[] = ['TamilNadu', 'Karnataka'];
   _Cities: any[] = ['Chennai', 'Bangalore'];

   constructor() { }

   ngOnInit() {
   }

}
