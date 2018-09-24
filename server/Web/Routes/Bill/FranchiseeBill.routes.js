module.exports = function(app) {

   var Controller = require('./../../Controller/Bill/FranchiseeBill.controller.js');

   app.post('/API/FranchiseeBill/FranchiseeBill_Create', Controller.FranchiseeBill_Create);
   app.post('/API/FranchiseeBill/FranchiseeBill_List', Controller.FranchiseeBill_List);
   app.post('/API/FranchiseeBill/FranchiseeBill_PaymentUpdate', Controller.FranchiseeBill_PaymentUpdate);
 
};