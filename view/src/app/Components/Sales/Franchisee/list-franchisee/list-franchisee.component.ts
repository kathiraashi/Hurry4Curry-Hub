import { Component, OnInit } from '@angular/core';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { DeleteConfirmationComponent } from '../../../../Components/Common-Components/delete-confirmation/delete-confirmation.component';

@Component({
  selector: 'app-list-franchisee',
  templateUrl: './list-franchisee.component.html',
  styleUrls: ['./list-franchisee.component.css']
})
export class ListFranchiseeComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }

   ngOnInit() {
   }

   DeleteFranchisee() {
      const initialState = {
         Text: 'Franchisee'
      };
      this.bsModalRef = this.modalService.show(DeleteConfirmationComponent, Object.assign({initialState}, { class: 'modal-sm' }));
   }

}
