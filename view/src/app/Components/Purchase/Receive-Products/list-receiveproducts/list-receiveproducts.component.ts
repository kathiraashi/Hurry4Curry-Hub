import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { ModelUpdateYieldComponent } from '../../../../models/Inventory/model-update-yield/model-update-yield.component';

@Component({
  selector: 'app-list-receiveproducts',
  templateUrl: './list-receiveproducts.component.html',
  styleUrls: ['./list-receiveproducts.component.css']
})
export class ListReceiveproductsComponent implements OnInit {

   bsModalRef: BsModalRef;
   constructor( private modalService: BsModalService) { }


   ngOnInit() {
   }

   UpdateYield() {
      const initialState = {
         Type: 'Create'
      };
      this.bsModalRef = this.modalService.show(ModelUpdateYieldComponent, Object.assign({initialState}, { class: 'modal-lg' }));
   }
}
