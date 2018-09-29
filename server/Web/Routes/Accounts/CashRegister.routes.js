module.exports = function(app) {

   var Controller = require('./../../Controller/Accounts/CashRegister.controller.js');
   
   app.post('/API/CashRegister/CashRegister_List', Controller.CashRegister_List);

};