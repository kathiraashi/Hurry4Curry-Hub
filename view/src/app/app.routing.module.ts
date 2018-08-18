import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './Authentication/auth.guard';

import { LoginComponent } from './Components/Common-Components/login/login.component';
import { PurchaseRequestListComponent } from './Components/Purchase/PurchaseRequest/purchase-request-list/purchase-request-list.component';
import {PurchaseRequestCreateComponent  } from './Components/Purchase/PurchaseRequest/purchase-request-create/purchase-request-create.component';
import { PurchaseRequestViewComponent } from './Components/Purchase/PurchaseRequest/purchase-request-view/purchase-request-view.component';
import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';
import { ListStockValuesComponent } from './Components/Purchase/Stock-Values/list-stock-values/list-stock-values.component';
import { ViewStockValuesComponent } from './Components/Purchase/Stock-Values/view-stock-values/view-stock-values.component';
import { ListBankRegistersComponent } from './Components/Accounts/Bank-Registers/list-bank-registers/list-bank-registers.component';
import { ListCashRegistersComponent } from './Components/Accounts/Cash-Registers/list-cash-registers/list-cash-registers.component';
import { ListChequeEntriesComponent } from './Components/Accounts/Cheque-Entries/list-cheque-entries/list-cheque-entries.component';
import { ViewChequeEntriesComponent } from './Components/Accounts/Cheque-Entries/view-cheque-entries/view-cheque-entries.component';
import { DashBoardComponent } from './Components/DashBoard/dash-board/dash-board.component';
import { ListFranchiseeComponent } from './Components/Sales/Franchisee/list-franchisee/list-franchisee.component';
import { CreateFranchiseeComponent } from './Components/Sales/Franchisee/create-franchisee/create-franchisee.component';
import { ViewFranchiseeComponent } from './Components/Sales/Franchisee/view-franchisee/view-franchisee.component';
import { ListBillComponent } from './Components/Sales/Bill/list-bill/list-bill.component';
import { CreateBillComponent } from './Components/Sales/Bill/create-bill/create-bill.component';
import { ViewBillComponent } from './Components/Sales/Bill/view-bill/view-bill.component';
import { ListPurchaseBillsComponent } from './Components/Purchase/Purchase-Bills/list-purchase-bills/list-purchase-bills.component';
import { ViewPurchaseBillsComponent } from './Components/Purchase/Purchase-Bills/view-purchase-bills/view-purchase-bills.component';
import { ListFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/list-franchisee-payments/list-franchisee-payments.component';
import { CreateFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/create-franchisee-payments/create-franchisee-payments.component';
import { ViewFranchiseePaymentsComponent } from './Components/Accounts/Franchisee-Payments/view-franchisee-payments/view-franchisee-payments.component';
import { ListReceiveproductsComponent } from './Components/Purchase/Receive-Products/list-receiveproducts/list-receiveproducts.component';
import { ViewReceiveproductsComponent } from './Components/Purchase/Receive-Products/view-receiveproducts/view-receiveproducts.component';
import { ListDeliverProductsComponent } from './Components/Purchase/Deliver-Products/list-deliver-products/list-deliver-products.component';
import { ViewDeliverProductsComponent } from './Components/Purchase/Deliver-Products/view-deliver-products/view-deliver-products.component';



const appRoutes: Routes = [
   {
      path: '',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
      path: 'Login',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
    path: 'List_Franchisee',
    component: ListFranchiseeComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Franchisee'}   }
 },
 {
    path: 'Create_Franchisee',
    component: CreateFranchiseeComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Franchisee'}   }
 },
 {
    path: 'View_Franchisee',
    component: ViewFranchiseeComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Franchisee'}   }
 },
 {
    path: 'List_Bill',
    component: ListBillComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Bill'}   }
 },
 {
    path: 'Create_Bill',
    component: CreateBillComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Bill'}   }
 },
 {
    path: 'View_Bill',
    component: ViewBillComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Bill'}   }
 },
   {
      path: 'purchase_request_list',
      component: PurchaseRequestListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'purchase_request_list'}   }
   },
   {
      path: 'purchase_request_create',
      component: PurchaseRequestCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'purchase_request_create'}   }
   },
  {
      path: 'Purchase_Request_View',
      component: PurchaseRequestViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Request_View'}   }
   },
   {
    path: 'List_Receive_Products',
    component: ListReceiveproductsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Receive_Products'}   }
 },
 {
    path: 'View_Receive_Products',
    component: ViewReceiveproductsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Receive_Products'}   }
 },
 {
    path: 'List_Deliver_Products',
    component: ListDeliverProductsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Deliver_Products'}   }
 },
 {
    path: 'View_Deliver_Products',
    component: ViewDeliverProductsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Deliver_Products'}   }
 },
   {
    path: 'Purchase_Bills_List',
    component: ListPurchaseBillsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Purchase_Bills_List'}   }
 },
 {
    path: 'Purchase_Bills_View',
    component: ViewPurchaseBillsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Purchase_Bills_View'}   }
 },
  {
    path: 'List_Franchisee_payments',
    component: ListFranchiseePaymentsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Franchisee_payments'}  }
 },
 {
    path: 'Create_Franchisee_payments',
    component: CreateFranchiseePaymentsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Franchisee_payments'}  }
 },
 {
    path: 'View_Franchisee_payments',
    component: ViewFranchiseePaymentsComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Franchisee_payments'}   }
 },
   {
      path: 'vendor_payment_list',
      component: VendorPaymentsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'vendor_payment_list'}   }
   },
   {
    path: 'vendor_payment_view',
    component: VendorPaymentsViewComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'vendor_payment_view'}   }
},
{
    path: 'List_Product',
    component: ListProductComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Product'}   }
},
{
    path: 'Create_Product',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Product'}   }
},
{
    path: 'View_Product',
    component: ViewProductComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Product'}   }
},
{
    path: 'List_Stock_Values',
    component: ListStockValuesComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Stock_Values'}   }
},
{
    path: 'View_Stock_Values',
    component: ViewStockValuesComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Stock_Values'}   }
},
{
    path: 'List_Bank_Register',
    component: ListBankRegistersComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Bank_Register'}   }
},
{
    path: 'List_Cash_Register',
    component: ListCashRegistersComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Cash_Register'}   }
},
{
    path: 'List_Cheque_Entries',
    component: ListChequeEntriesComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Cheque_Entries'}   }
},
{
    path: 'View_Cheque_Entries',
    component: ViewChequeEntriesComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Cheque_Entries'}   }
},
{
    path: 'Main_Dashboard',
    component: DashBoardComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Main_Dashboard'}   }
},





];


@NgModule({
    declarations: [ ],
    imports: [ RouterModule.forRoot(appRoutes,
        { enableTracing: true }
      )],
    providers: [],
    bootstrap: []
  })
  export class AppRoutingModule { }
