import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';



import { ToasterServiceService } from '../../../../services/common-services/Toaster-Service/toaster-service.service';
import * as CryptoJS from 'crypto-js';
import { FranchiseeService } from '../../../../services/Sales/Franchisee/franchisee.service';
@Component({
  selector: 'app-list-franchisee',
  templateUrl: './list-franchisee.component.html',
  styleUrls: ['./list-franchisee.component.css']
})
export class ListFranchiseeComponent implements OnInit {

   Company_Id = '5b3c66d01dd3ff14589602fe';
   User_Id = '5b3c7268f838b31bc89e7c8c';

   Loader: Boolean = false;

   _List: any[] = [];

   bsModalRef: BsModalRef;
   constructor(  private Toaster: ToasterServiceService,
      public Sales_Service: FranchiseeService,
      public router: Router,
      private modalService: BsModalService) { }

   ngOnInit() {

   }


}
