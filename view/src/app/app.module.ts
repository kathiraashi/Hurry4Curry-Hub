// Default Modules
   import { NgModule } from '@angular/core';
   import { CommonModule} from '@angular/common';
   import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
   import { BrowserModule } from '@angular/platform-browser';
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   import { HttpModule } from '@angular/http';
   import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
   import { RouterModule, Routes } from '@angular/router';

// Default Components
   import { AppComponent } from './app.component';

// Future Modules
   import { ModalModule, AccordionModule} from 'ngx-bootstrap';
   import {CalendarModule} from 'primeng/calendar';
   import {MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatMenuModule} from '@angular/material';
   import { NgSelectModule } from '@ng-select/ng-select';

// Custom Modules
   import { AppRoutingModule } from './app.routing.module';
   import { AuthGuard } from './Authentication/auth.guard';

// Custom Components
   // Component Folder
      // Common-Components ---------------------------------------------------
         import { DeleteConfirmationComponent } from './Components/Common-Components/delete-confirmation/delete-confirmation.component';
         import { HeaderComponent } from './Components/Common-Components/header/header.component';
         import { LoginComponent } from './Components/Common-Components/login/login.component';
      // Settings Folder ----------------------------------------------------
         // CRM Settings Folder
            import { MainCrmSettingsComponent } from './Components/Settings/CRM-Settings/main-crm-settings/main-crm-settings.component';
            // Sub Components Folder
               import { AccountTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/account-type-crm-settings/account-type-crm-settings.component';
               import { IndustryTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/industry-type-crm-settings/industry-type-crm-settings.component';
               import { OwnerShipTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/owner-ship-type-crm-settings/owner-ship-type-crm-settings.component';
               import { ActivityTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-type-crm-settings/activity-type-crm-settings.component';
               import { ActivityStatusTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-status-type-crm-settings/activity-status-type-crm-settings.component';
               import { ActivityPriorityTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-priority-type-crm-settings/activity-priority-type-crm-settings.component';
               import { PipeLineStatusTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/pipe-line-status-type-crm-settings/pipe-line-status-type-crm-settings.component';
               import { ContactRoleTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/contact-role-type-crm-settings/contact-role-type-crm-settings.component';
               import { QuoteTermsTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/quote-terms-type-crm-settings/quote-terms-type-crm-settings.component';
         // Lead Settings Folder
            import { MainLeadsSettingsComponent } from './Components/Settings/Lead-Settings/main-leads-settings/main-leads-settings.component';
            // Sub Components Folder
               import { LeadSourceTypeLeadSettingsComponent } from './Components/Settings/Lead-settings/sub-components/lead-source-type-lead-settings/lead-source-type-lead-settings.component';
         // Company Settings Folder
            import { MainCompanySettingsComponent } from './Components/Settings/Company-Settings/main-company-settings/main-company-settings.component';
            // Sub Components Folder
               import { CompanyInfoCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/company-info-company-settings/company-info-company-settings.component';
               import { ContactInfoCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/contact-info-company-settings/contact-info-company-settings.component';
               import { DepartmentsCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/departments-company-settings/departments-company-settings.component';
               import { BranchCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/branch-company-settings/branch-company-settings.component';
               import { RegistrationInfoCompanySettingsComponent } from './Components/settings/Company-Settings/SubComponents/registration-info-company-settings/registration-info-company-settings.component';
               import { ESIInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/esiinfo-company-settings/esiinfo-company-settings.component';
               import { PFInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/pfinfo-company-settings/pfinfo-company-settings.component';
               import { ItInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/it-info-company-settings/it-info-company-settings.component';
               import { PTInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/ptinfo-company-settings/ptinfo-company-settings.component';
               import { RegistrationTypeCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/registration-type-company-settings/registration-type-company-settings.component';
         // purchase settings folder
            import { MainPurchaseSettingsComponent } from './Components/Settings/Purchase-Settings/main-purchase-settings/main-purchase-settings.component';
            // Sub Components
               import { VendorQuoteTermsPurchaseSettingsComponent } from './Components/Settings/Purchase-Settings/SubComponents/vendor-quote-terms-purchase-settings/vendor-quote-terms-purchase-settings.component';
         // Hrms Settings Folder
            import { MainHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/main-hrms-settings/main-hrms-settings.component';
            // Sub Components
               import { LeaveTypeHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/SubComponents/leave-type-hrms-settings/leave-type-hrms-settings.component';
               import { ExpensesTypeHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/SubComponents/expenses-type-hrms-settings/expenses-type-hrms-settings.component';
         // Hr Settings Folder
            import { MainHrSettingsComponent } from './Components/Settings/HR-Settings/main-hr-settings/main-hr-settings.component';
            // Sub Components
               import { EmployeeCategoryHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/employee-category-hr-settings/employee-category-hr-settings.component';
               import { DepartmentHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/department-hr-settings/department-hr-settings.component';
               import { DesignationHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/designation-hr-settings/designation-hr-settings.component';
         // Account Settings Folder
            import { MainAccountSettingsComponent } from './Components/Settings/Account-Settings/main-account-settings/main-account-settings.component';
             // Sub Components
               import { TaxesAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/taxes-account-settings/taxes-account-settings.component';
               import { BankAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/bank-account-settings/bank-account-settings.component';
               import { IncomeTypeAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/income-type-account-settings/income-type-account-settings.component';
               import { AssetTypeAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/asset-type-account-settings/asset-type-account-settings.component';
               import { PaymentTermsAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/payment-terms-account-settings/payment-terms-account-settings.component';
         // Inventory settings Folder
            import { MainInventorySettingsComponent } from './Components/Settings/Inventory-Settings/main-inventory-settings/main-inventory-settings.component';
            // Sub Components
               import { WareHouseInventorySettingsComponent } from './Components/Settings/Inventory-Settings/SubComponents/ware-house-inventory-settings/ware-house-inventory-settings.component';
         // Product Settings Folder
            import { MainProductSettingsComponent } from './Components/Settings/Product-Settings/main-product-settings/main-product-settings.component';
            // Sub Components
               import { ConfigurationProductSettingsComponent } from './Components/Settings/Product-Settings/SubComponents/configuration-product-settings/configuration-product-settings.component';
   // models -----------------------------------------------------------
      // settings
         // company settings
            import { ModelCompanyinfoCompanysettingsComponent } from './models/settings/company_settings/model-companyinfo-companysettings/model-companyinfo-companysettings.component';
            import { ModelContactinfoCompanysettingsComponent } from './models/settings/company_settings/model-contactinfo-companysettings/model-contactinfo-companysettings.component';
            import { ModelDepartmentsCompanysettingsComponent } from './models/settings/company_settings/model-departments-companysettings/model-departments-companysettings.component';
            import { ModelBranchCompanysettingsComponent } from './models/settings/company_settings/model-branch-companysettings/model-branch-companysettings.component';
            import { ModelRegistrationinfoCompanysettingsComponent } from './models/settings/company_settings/model-registrationinfo-companysettings/model-registrationinfo-companysettings.component';
            import { ModelPfinfoCompanysettingsComponent } from './models/settings/company_settings/model-pfinfo-companysettings/model-pfinfo-companysettings.component';
            import { ModelEsiinfoCompanysettingsComponent } from './models/settings/company_settings/model-esiinfo-companysettings/model-esiinfo-companysettings.component';
            import { ModelPtinfoCompanysettingsComponent } from './models/settings/company_settings/model-ptinfo-companysettings/model-ptinfo-companysettings.component';
            import { ModelItinfoCompanysettingsComponent } from './models/settings/company_settings/model-itinfo-companysettings/model-itinfo-companysettings.component';
            import { ModelRegistrationtypeCompanysettingsComponent } from './models/settings/company_settings/model-registrationtype-companysettings/model-registrationtype-companysettings.component';
         // CRM Settings
            import { ModelIndustrytypeCrmsettingsComponent } from './models/settings/crm_settings/model-industrytype-crmsettings/model-industrytype-crmsettings.component';
            import { ModelOwnershipytypeCrmsettingsComponent } from './models/settings/crm_settings/model-ownershipytype-crmsettings/model-ownershipytype-crmsettings.component';
            import { ModelActivitytypeCrmsettingsComponent } from './models/settings/crm_settings/model-activitytype-crmsettings/model-activitytype-crmsettings.component';
            import { ModelActivitystatusCrmsettingsComponent } from './models/settings/crm_settings/model-activitystatus-crmsettings/model-activitystatus-crmsettings.component';
            import { ModelActivitypriorityCrmsettingsComponent } from './models/settings/crm_settings/model-activitypriority-crmsettings/model-activitypriority-crmsettings.component';
            import { ModelPipelinestatusCrmsettingsComponent } from './models/settings/crm_settings/model-pipelinestatus-crmsettings/model-pipelinestatus-crmsettings.component';
            import { ModelContactroleCrmsettingsComponent } from './models/settings/crm_settings/model-contactrole-crmsettings/model-contactrole-crmsettings.component';
            import { ModelQuotetermsCrmsettingsComponent } from './models/settings/crm_settings/model-quoteterms-crmsettings/model-quoteterms-crmsettings.component';
         // Lead Settings
            import { ModelLeadsourceLeadsettingsComponent } from './models/settings/lead_settings/model-leadsource-leadsettings/model-leadsource-leadsettings.component';
         // Purchase Settings
            import { ModelVendorquotetermsPurchasesettingsComponent } from './models/settings/purchase_settings/model-vendorquoteterms-purchasesettings/model-vendorquoteterms-purchasesettings.component';
         // HRMS settings
            import { ModelLeavetypeHrmssettingsComponent } from './models/settings/hrms_settings/model-leavetype-hrmssettings/model-leavetype-hrmssettings.component';
            import { ModelExpensestypeHrmssettingsComponent } from './models/settings/hrms_settings/model-expensestype-hrmssettings/model-expensestype-hrmssettings.component';
         // HR settings
            import { ModelEmployeecategoryHrsettingsComponent } from './models/settings/hr_settings/model-employeecategory-hrsettings/model-employeecategory-hrsettings.component';
            import { ModelDepartmentHrsettingsComponent } from './models/settings/hr_settings/model-department-hrsettings/model-department-hrsettings.component';
            import { ModelDesignationHrsettingsComponent } from './models/settings/hr_settings/model-designation-hrsettings/model-designation-hrsettings.component';
         // Inventory settings
            import { ModelWarehouseInventorysettingsComponent } from './models/settings/inventory_settings/model-warehouse-inventorysettings/model-warehouse-inventorysettings.component';
         // Account Settings
            import { ModelTaxesAccountsettingsComponent } from './models/settings/account_settings/model-taxes-accountsettings/model-taxes-accountsettings.component';
            import { ModelBankAccountsettingsComponent } from './models/settings/account_settings/model-bank-accountsettings/model-bank-accountsettings.component';
            import { ModelIncometypeAccountsettingsComponent } from './models/settings/account_settings/model-incometype-accountsettings/model-incometype-accountsettings.component';
            import { ModelAssettypeAccountsettingsComponent } from './models/settings/account_settings/model-assettype-accountsettings/model-assettype-accountsettings.component';
            import { ModelPaymenttermsAccountsettingsComponent } from './models/settings/account_settings/model-paymentterms-accountsettings/model-paymentterms-accountsettings.component';


      // Sales Folder --------------------------------------------------------------
         // Customers ----------------
            // Sales Customers List
               import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
            // Sales Customers View
               // Main Sales Customers View
                  import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
            // Sales-customers-create
                import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
        // Invoice ---------------------
            import { CrmInvoiceCreateComponent } from './Components/CRM/Invoice/crm-invoice-create/crm-invoice-create.component';
            import { CrmInvoiceListComponent } from './Components/CRM/Invoice/crm-invoice-list/crm-invoice-list.component';
            import { CrmInvoiceViewComponent } from './Components/CRM/Invoice/crm-invoice-view/crm-invoice-view.component';
      // Leads Folder ----------------------------------------------------

// models
    // HRMS
        import { ModelLeavesHrmsComponent } from './models/HRMS/model-leaves-hrms/model-leaves-hrms.component';
        import { ModelOndutyHrmsComponent } from './models/HRMS/model-onduty-hrms/model-onduty-hrms.component';
        import { ModelPermissionsHrmsComponent } from './models/HRMS/model-permissions-hrms/model-permissions-hrms.component';
        import { ModelAdvanceHrmsComponent } from './models/HRMS/model-advance-hrms/model-advance-hrms.component';
    // Inventory folder
        // Inventory_Request
        import { PurchaseRequestListComponent } from './Components/Purchase/PurchaseRequest/purchase-request-list/purchase-request-list.component';
        import { PurchaseRequestCreateComponent } from './Components/Purchase/PurchaseRequest/purchase-request-create/purchase-request-create.component';
        import { PurchaseRequestViewComponent } from './Components/Purchase/PurchaseRequest/purchase-request-view/purchase-request-view.component';
        // Vendor Bills
        import { VendorBillsListComponent } from './Components/Purchase/VendorBills/vendor-bills-list/vendor-bills-list.component';
        import { VendorBillsCreateComponent } from './Components/Purchase/VendorBills/vendor-bills-create/vendor-bills-create.component';
        import { VendorBillsViewComponent } from './Components/Purchase/VendorBills/vendor-bills-view/vendor-bills-view.component';
        // vendor
        import { VendorListComponent } from './Components/Purchase/Vendor/vendor-list/vendor-list.component';
        import { VendorCreateComponent } from './Components/Purchase/Vendor/vendor-create/vendor-create.component';
            // main vendor view
                import { MainVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/main-vendor-view/main-vendor-view.component';

    // Accounts Folder
        // Customer
            import { AccountsCustomerPaymentsListComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-list/accounts-customer-payments-list.component';
        // vendor
            import { AccountsCustomerPaymentsViewComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-view/accounts-customer-payments-view.component';
import { CustomerPaymentsCreateComponent } from './Components/Accounts/customer-payments/customer-payments-create/customer-payments-create.component';
import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
import { VendorPaymentsCreateComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-create/vendor-payments-create.component';
import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';
import { UserManagementListComponent } from './Components/Settings/UserManagement/user-management-list/user-management-list.component';
import { UserPermissionsComponent } from './Components/Settings/UserPermissions/user-permissions/user-permissions.component';
import { ModelUserCreateUserManagementComponent } from './models/settings/user_management/model-user-create-user-management/model-user-create-user-management.component';
import { UserPermissionsGroupCreateComponent } from './Components/Settings/UserPermissions/user-permissions-group-create/user-permissions-group-create.component';
import { ModelEmployeesCreateComponent } from './models/HR/model-employees-create/model-employees-create.component';
import { ModelAttendanceLogCreateComponent } from './models/HR/model-attendance-log-create/model-attendance-log-create.component';
import { ModelAttendanceReportCreateComponent } from './models/HR/model-attendance-report-create/model-attendance-report-create.component';
import { ModelPayrollMasterViewComponent } from './models/HR/model-payroll-master-view/model-payroll-master-view.component';
import { EarningsHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/earnings-hr-settings/earnings-hr-settings.component';
import { DetectionsHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/detections-hr-settings/detections-hr-settings.component';
import { ModelEarningsHrsettingsComponent } from './models/settings/hr_settings/model-earnings-hrsettings/model-earnings-hrsettings.component';
import { ModelDetectionsHrsettingsComponent } from './models/settings/hr_settings/model-detections-hrsettings/model-detections-hrsettings.component';


// Services
import { LoginService } from './services/LoginService/login.service';
import { CallScheduleLeadComponent } from './models/Leads/call-schedule-lead/call-schedule-lead.component';
import { LogPhoneCallLeadComponent } from './models/Leads/log-phone-call-lead/log-phone-call-lead.component';
import { LocationsInventorySettingsComponent } from './Components/Settings/Inventory-Settings/SubComponents/locations-inventory-settings/locations-inventory-settings.component';
import { ModelLocationsInventorySettingsComponent } from './models/settings/inventory_settings/model-locations-inventory-settings/model-locations-inventory-settings.component';
import { CurrencyAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/currency-account-settings/currency-account-settings.component';
import { ModelCurrencyAccountSettingsComponent } from './models/settings/account_settings/model-currency-account-settings/model-currency-account-settings.component';
import { EmployeesCreateComponent } from './Components/HR/Employees/employees-create/employees-create.component';
import { EmployeesListComponent } from './Components/HR/Employees/employees-list/employees-list.component';
import { EmployeesViewComponent } from './Components/HR/Employees/employees-view/employees-view.component';
import { CreateAttendanceLogComponent } from './Components/HR/Attendance-Log/create-attendance-log/create-attendance-log.component';
import { ListAttendanceLogComponent } from './Components/HR/Attendance-Log/list-attendance-log/list-attendance-log.component';
import { ViewAttendanceLogComponent } from './Components/HR/Attendance-Log/view-attendance-log/view-attendance-log.component';
import { CreateAttendanceReportComponent } from './Components/HR/Attendance-Report/create-attendance-report/create-attendance-report.component';
import { ListAttendanceReportComponent } from './Components/HR/Attendance-Report/list-attendance-report/list-attendance-report.component';
import { ViewAttendanceReportComponent } from './Components/HR/Attendance-Report/view-attendance-report/view-attendance-report.component';
import { PayrollListComponent } from './Components/HR/Payroll/payroll-list/payroll-list.component';
import { PayrollViewComponent } from './Components/HR/Payroll/payroll-view/payroll-view.component';
import { CreatePayrollMasterComponent } from './Components/HR/Payroll-Master/create-payroll-master/create-payroll-master.component';
import { ListPayrollMasterComponent } from './Components/HR/Payroll-Master/list-payroll-master/list-payroll-master.component';
// import { DashBoardComponent } from './Components/HRMS/DashBoard/dash-board/dash-board.component';
import { ListLeavesComponent } from './Components/HRMS/Leaves/list-leaves/list-leaves.component';
import { CreateLeavesComponent } from './Components/HRMS/Leaves/create-leaves/create-leaves.component';
import { ViewLeavesComponent } from './Components/HRMS/Leaves/view-leaves/view-leaves.component';
import { ListOnDutyComponent } from './Components/HRMS/On-Duty/list-on-duty/list-on-duty.component';
import { CreateOnDutyComponent } from './Components/HRMS/On-Duty/create-on-duty/create-on-duty.component';
import { ViewOnDutyComponent } from './Components/HRMS/On-Duty/view-on-duty/view-on-duty.component';
import { CreatePermissionsComponent } from './Components/HRMS/Permissions/create-permissions/create-permissions.component';
import { ListPermissionsComponent } from './Components/HRMS/Permissions/list-permissions/list-permissions.component';
import { ViewPermissionsComponent } from './Components/HRMS/Permissions/view-permissions/view-permissions.component';
import { CreateAdvanceComponent } from './Components/HRMS/Advance/create-advance/create-advance.component';
import { ListAdvanceComponent } from './Components/HRMS/Advance/list-advance/list-advance.component';
import { ViewAdvanceComponent } from './Components/HRMS/Advance/view-advance/view-advance.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';
import { ListStockValuesComponent } from './Components/Purchase/Stock-Values/list-stock-values/list-stock-values.component';
import { ViewStockValuesComponent } from './Components/Purchase/Stock-Values/view-stock-values/view-stock-values.component';
import { ListBankRegistersComponent } from './Components/Accounts/Bank-Registers/list-bank-registers/list-bank-registers.component';
import { ListCashRegistersComponent } from './Components/Accounts/Cash-Registers/list-cash-registers/list-cash-registers.component';
import { ListChequeEntriesComponent } from './Components/Accounts/Cheque-Entries/list-cheque-entries/list-cheque-entries.component';
import { ModelBankRegisterComponent } from './models/Accounts/model-bank-register/model-bank-register.component';
import { ModelChequeEntriesComponent } from './models/Accounts/model-cheque-entries/model-cheque-entries.component';
import { ViewChequeEntriesComponent } from './Components/Accounts/Cheque-Entries/view-cheque-entries/view-cheque-entries.component';
import { DashBoardComponent } from './Components/DashBoard/dash-board/dash-board.component';


@NgModule({
   declarations: [
      // Default Components
         AppComponent,
      // Custom Components
         // Component Folder
            // Common-Components Folder
              HeaderComponent,
            // Settings Folder
               // CRM Settings Folder
                  MainCrmSettingsComponent,
                  // Sub Components Folder
                     AccountTypeCrmSettingsComponent,
                     IndustryTypeCrmSettingsComponent,
                     OwnerShipTypeCrmSettingsComponent,
                     ActivityTypeCrmSettingsComponent,
                     ActivityStatusTypeCrmSettingsComponent,
                     ActivityPriorityTypeCrmSettingsComponent,
                     PipeLineStatusTypeCrmSettingsComponent,
                     ContactRoleTypeCrmSettingsComponent,
                     QuoteTermsTypeCrmSettingsComponent,
                // Lead Settings Folder
                 MainLeadsSettingsComponent,
                  // Sub Components Folder
                     LeadSourceTypeLeadSettingsComponent,
                // Company Settings Folder
                 MainCompanySettingsComponent,
                  // Sub Components Folder
                     CompanyInfoCompanySettingsComponent,
                     ContactInfoCompanySettingsComponent,
                     DepartmentsCompanySettingsComponent,
                     BranchCompanySettingsComponent,
                     RegistrationInfoCompanySettingsComponent,
                     ESIInfoCompanySettingsComponent,
                     PFInfoCompanySettingsComponent,
                     ItInfoCompanySettingsComponent,
                     PTInfoCompanySettingsComponent,
                     RegistrationTypeCompanySettingsComponent,
                // purchase settings folder
                 MainPurchaseSettingsComponent,
                 // Sub Components
                    VendorQuoteTermsPurchaseSettingsComponent,
                // Hrms Settings Folder
                 MainHrmsSettingsComponent,
                 // Sub Components
                    LeaveTypeHrmsSettingsComponent,
                    ExpensesTypeHrmsSettingsComponent,
                // Hr Settings Folder
                 MainHrSettingsComponent,
                 // Sub Components
                    EmployeeCategoryHrSettingsComponent,
                    DepartmentHrSettingsComponent,
                    DesignationHrSettingsComponent,
               // Account Settings Folder
                MainAccountSettingsComponent,
                 // Sub Components
                    TaxesAccountSettingsComponent,
                    BankAccountSettingsComponent,
                    IncomeTypeAccountSettingsComponent,
                    AssetTypeAccountSettingsComponent,
                    PaymentTermsAccountSettingsComponent,
                // Inventory settings Folder
                 MainInventorySettingsComponent,
                 // Sub Components
                    WareHouseInventorySettingsComponent,
               // Product Settings Folder
                 MainProductSettingsComponent,
                 // Sub Components
                    ConfigurationProductSettingsComponent,
    // models
    // settings
        // company settings
            ModelCompanyinfoCompanysettingsComponent,
            ModelContactinfoCompanysettingsComponent,
            ModelDepartmentsCompanysettingsComponent,
            ModelBranchCompanysettingsComponent,
            ModelRegistrationinfoCompanysettingsComponent,
            ModelPfinfoCompanysettingsComponent,
            ModelEsiinfoCompanysettingsComponent,
            ModelPtinfoCompanysettingsComponent,
            ModelItinfoCompanysettingsComponent,
            ModelRegistrationtypeCompanysettingsComponent,
        // CRM Settings
            ModelIndustrytypeCrmsettingsComponent,
            ModelOwnershipytypeCrmsettingsComponent,
            ModelActivitytypeCrmsettingsComponent,
            ModelActivitystatusCrmsettingsComponent,
            ModelActivitypriorityCrmsettingsComponent,
            ModelPipelinestatusCrmsettingsComponent,
            ModelContactroleCrmsettingsComponent,
            ModelQuotetermsCrmsettingsComponent,
        // Lead Settings
            ModelLeadsourceLeadsettingsComponent,
        // Purchase Settings
            ModelVendorquotetermsPurchasesettingsComponent,
        // HRMS settings
            ModelLeavetypeHrmssettingsComponent,
            ModelExpensestypeHrmssettingsComponent,
        // HR settings
            ModelEmployeecategoryHrsettingsComponent,
            ModelDepartmentHrsettingsComponent,
            ModelDesignationHrsettingsComponent,
       // Inventory settings
            ModelWarehouseInventorysettingsComponent,
        // Account Settings
            ModelTaxesAccountsettingsComponent,
            ModelBankAccountsettingsComponent,
            ModelIncometypeAccountsettingsComponent,
            ModelAssettypeAccountsettingsComponent,
            ModelPaymenttermsAccountsettingsComponent,
   // Components
    // Common-Components
        // delete-confirmation
                 DeleteConfirmationComponent,
    // Sales Folder
        // Customers
            // Sales-customers-list
                CrmCustomersListComponent,
                 // main Sales customers view
                    MainCrmCustomersViewComponent,
                    // SubComponents
                    CrmCustomersCreateComponent,
        // Invoice
        CrmInvoiceCreateComponent,
        CrmInvoiceListComponent,
        CrmInvoiceViewComponent,
    // models
    // models
        // HRMS
                ModelLeavesHrmsComponent,
                ModelOndutyHrmsComponent,
                ModelPermissionsHrmsComponent,
                ModelAdvanceHrmsComponent,
    // Inventory Folder
        // Inventory Request
        PurchaseRequestListComponent,
        PurchaseRequestCreateComponent,
        PurchaseRequestViewComponent,
        // Vendor Bills
         VendorBillsListComponent,
         VendorBillsCreateComponent,
         VendorBillsViewComponent,
        // vendor
         VendorListComponent,
         VendorCreateComponent,
              // main vendor view
                MainVendorViewComponent,

   // Accounts Folder
        // Customer

            AccountsCustomerPaymentsListComponent,

        // vendor
            AccountsCustomerPaymentsViewComponent,
            CustomerPaymentsCreateComponent,
            VendorPaymentsListComponent,
            VendorPaymentsCreateComponent,
            VendorPaymentsViewComponent,
            LoginComponent,
            UserManagementListComponent,
            UserPermissionsComponent,
            ModelUserCreateUserManagementComponent,
            UserPermissionsGroupCreateComponent,
            ModelEmployeesCreateComponent,

            ModelAttendanceLogCreateComponent,
            ModelAttendanceReportCreateComponent,
           ModelPayrollMasterViewComponent,
            EarningsHrSettingsComponent,
            DetectionsHrSettingsComponent,
            ModelEarningsHrsettingsComponent,
            ModelDetectionsHrsettingsComponent,
            CallScheduleLeadComponent,
            LogPhoneCallLeadComponent,
           LocationsInventorySettingsComponent,
            ModelLocationsInventorySettingsComponent,
            CurrencyAccountSettingsComponent,
            ModelCurrencyAccountSettingsComponent,
            EmployeesCreateComponent,
            EmployeesListComponent,
            EmployeesViewComponent,
            CreateAttendanceLogComponent,
            ListAttendanceLogComponent,
            ViewAttendanceLogComponent,
            CreateAttendanceReportComponent,
            ListAttendanceReportComponent,
            ViewAttendanceReportComponent,
            PayrollListComponent,
            PayrollViewComponent,
            CreatePayrollMasterComponent,
            ListPayrollMasterComponent,
            DashBoardComponent,
            ListLeavesComponent,
            CreateLeavesComponent,
            ViewLeavesComponent,
            ListOnDutyComponent,
            CreateOnDutyComponent,
            ViewOnDutyComponent,
            CreatePermissionsComponent,
            ListPermissionsComponent,
            ViewPermissionsComponent,
            CreateAdvanceComponent,
            ListAdvanceComponent,
            ViewAdvanceComponent,
            ListProductComponent,
            CreateProductComponent,
            ViewProductComponent,
            ListStockValuesComponent,
            ViewStockValuesComponent,
            ListBankRegistersComponent,
            ListCashRegistersComponent,
             ListChequeEntriesComponent,
               ModelBankRegisterComponent,
            ModelChequeEntriesComponent,
            ViewChequeEntriesComponent,
            DashBoardComponent


   ],
   imports: [
      // Default Modules
         BrowserModule,
         BrowserAnimationsModule,
         RouterModule,
         HttpModule,
         HttpClientModule,
         FormsModule,
         ReactiveFormsModule,
      // future modules
         ModalModule.forRoot(),
         AccordionModule.forRoot(),
         CalendarModule,
         NgSelectModule,
         MatButtonModule,
         MatFormFieldModule,
         MatSelectModule,
         MatCheckboxModule,
         MatMenuModule,
      // Custom Modules
         AppRoutingModule,
   ],
   providers: [AuthGuard],
   entryComponents: [ModelCompanyinfoCompanysettingsComponent,
      ModelContactinfoCompanysettingsComponent,
      ModelDepartmentsCompanysettingsComponent,
      ModelBranchCompanysettingsComponent,
      ModelRegistrationinfoCompanysettingsComponent,
      ModelPfinfoCompanysettingsComponent,
      ModelEsiinfoCompanysettingsComponent,
      ModelPtinfoCompanysettingsComponent,
      ModelItinfoCompanysettingsComponent,
      ModelRegistrationtypeCompanysettingsComponent,
      ModelIndustrytypeCrmsettingsComponent,
      ModelOwnershipytypeCrmsettingsComponent,
      ModelActivitytypeCrmsettingsComponent,
      ModelActivitystatusCrmsettingsComponent,
      ModelActivitypriorityCrmsettingsComponent,
      ModelPipelinestatusCrmsettingsComponent,
      ModelContactroleCrmsettingsComponent,
      ModelQuotetermsCrmsettingsComponent,
      ModelLeadsourceLeadsettingsComponent,
      ModelVendorquotetermsPurchasesettingsComponent,
      ModelLeavetypeHrmssettingsComponent,
      ModelExpensestypeHrmssettingsComponent,
      ModelEmployeecategoryHrsettingsComponent,
      ModelDepartmentHrsettingsComponent,
      ModelDesignationHrsettingsComponent,
      ModelWarehouseInventorysettingsComponent,
      ModelTaxesAccountsettingsComponent,
      ModelBankAccountsettingsComponent,
      ModelIncometypeAccountsettingsComponent,
      ModelAssettypeAccountsettingsComponent,
      ModelPaymenttermsAccountsettingsComponent,
      DeleteConfirmationComponent,
        ModelLeavesHrmsComponent,
      ModelOndutyHrmsComponent,
      ModelPermissionsHrmsComponent,
      ModelAdvanceHrmsComponent,
      ModelUserCreateUserManagementComponent,
     ModelEmployeesCreateComponent,
      ModelAttendanceLogCreateComponent,
      ModelAttendanceReportCreateComponent,
      ModelPayrollMasterViewComponent,
      ModelEarningsHrsettingsComponent,
      ModelDetectionsHrsettingsComponent,
      LogPhoneCallLeadComponent,
      CallScheduleLeadComponent,
      ModelLocationsInventorySettingsComponent,
      ModelCurrencyAccountSettingsComponent,
      ModelBankRegisterComponent,
      ModelChequeEntriesComponent
    ],
   bootstrap: [AppComponent]
})
export class AppModule { }

