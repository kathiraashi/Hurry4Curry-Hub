module.exports = function(app) {
    var Controller = require('./../../Controller/Supplier/Supplier.controller.js');

    app.post('/API/Supplier/Supplier_PhoneNumber_AsyncValidate', Controller.Supplier_PhoneNumber_AsyncValidate);
 
    app.post('/API/Supplier/Supplier_Create', Controller.Supplier_Create);
    app.post('/API/Supplier/Supplier_List', Controller.Supplier_List);
    app.post('/API/Supplier/Supplier_View', Controller.Supplier_View);
    app.post('/API/Supplier/Supplier_Update', Controller.Supplier_Update);
}