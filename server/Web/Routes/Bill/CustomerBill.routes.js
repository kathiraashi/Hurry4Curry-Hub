module.exports = function(app) {

    var Controller = require('./../../Controller/Bill/CustomerBill.controller.js');
 
    app.post('/API/CustomerBill/CustomerBill_Create', Controller.CustomerBill_Create);
    app.post('/API/CustomerBill/CustomerBill_List', Controller.CustomerBill_List);
  
 };