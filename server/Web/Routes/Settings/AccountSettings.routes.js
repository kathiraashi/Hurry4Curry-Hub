module.exports = function(app) {

   var Controller = require('./../../Controller/Settings/AccountSettings.controller.js');

   app.post('/API/AccountSettings/Bank_AsyncValidate', Controller.Bank_AsyncValidate);
   app.post('/API/AccountSettings/Bank_Create', Controller.Bank_Create);
   app.post('/API/AccountSettings/Bank_List', Controller.Bank_List);
   app.post('/API/AccountSettings/Bank_Update', Controller.Bank_Update);
   app.post('/API/AccountSettings/Bank_Delete', Controller.Bank_Delete);
   app.post('/API/AccountSettings/Bank_SimpleList', Controller.Bank_SimpleList);


   app.post('/API/AccountSettings/ExpenseType_AsyncValidate', Controller.ExpenseType_AsyncValidate);
   app.post('/API/AccountSettings/ExpenseType_Create', Controller.ExpenseType_Create);
   app.post('/API/AccountSettings/ExpenseType_List', Controller.ExpenseType_List);
   app.post('/API/AccountSettings/ExpenseType_Update', Controller.ExpenseType_Update);
   app.post('/API/AccountSettings/ExpenseType_Delete', Controller.ExpenseType_Delete);
   app.post('/API/AccountSettings/ExpenseType_SimpleList', Controller.ExpenseType_SimpleList);

};
