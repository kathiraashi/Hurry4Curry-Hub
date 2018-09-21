module.exports = function(app) {

    var Controller = require('./../../Controller/Bill/Bill.controller.js');
 
    app.post('/API/Bill/Bill_Create', Controller.Bill_Create);
    app.post('/API/Bill/Bill_List', Controller.Bill_List);
  
 };