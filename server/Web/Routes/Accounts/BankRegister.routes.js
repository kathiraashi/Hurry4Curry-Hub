module.exports = function(app) {

   var Controller = require('./../../Controller/Accounts/BankRegister.controller');
   
   app.post('/API/BankRegister/BankRegister_List', Controller.BankRegister_List);

};