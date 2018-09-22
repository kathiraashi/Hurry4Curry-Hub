module.exports = function(app) {

   var Controller = require('./../../Controller/Accounts/LogExpenses.controller.js');

   app.post('/API/LogExpenses/LogExpenses_Create', Controller.LogExpenses_Create);
   app.post('/API/LogExpenses/LogExpenses_List', Controller.LogExpenses_List);
   app.post('/API/LogExpenses/LogExpenses_Update', Controller.LogExpenses_Update);

};