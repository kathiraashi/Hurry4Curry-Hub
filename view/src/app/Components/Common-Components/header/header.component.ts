import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

   constructor( public router: Router) {
   }

   ngOnInit() {
   }

   ModulesValidate(Key) {
    return true;
   }

   SubModulesValidate(Key) {
    return true;
   }

   LogOut() {
      sessionStorage.clear();
      this.router.navigate(['/Login']);
   }

}
