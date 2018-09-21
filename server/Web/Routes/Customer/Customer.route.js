module.exports = function(app) {

    var Controller = require('./../../Controller/Customer/Customer.controller.js');
 
    app.post('/API/Customer/Customer_PhoneNumber_AsyncValidate', Controller.Customer_PhoneNumber_AsyncValidate);
 
    app.post('/API/Customer/Customer_Create', Controller.Customer_Create);
    app.post('/API/Customer/Customer_List', Controller.Customer_List);
    app.post('/API/Customer/Customer_View', Controller.Customer_View);
    app.post('/API/Customer/Customer_Update', Controller.Customer_Update);
    app.post('/API/Customer/Customer_Edit', Controller.Customer_List);
 };