module.exports = function(app) {

   var Controller = require('./../../controller/Sales/SalesFranchisee.controller.js');

   app.post('/API/SalesFranchisee/SalesFranchisee_Create', Controller.SalesFranchisee_Create);
   app.post('/API/SalesFranchisee/SalesFranchisee_List', Controller.SalesFranchisee_List);
   app.post('/API/SalesFranchisee/SalesFranchisee_SimpleList', Controller.SalesFranchisee_SimpleList);
   app.post('/API/SalesFranchisee/SalesFranchisee_View', Controller.SalesFranchisee_View);
 
};