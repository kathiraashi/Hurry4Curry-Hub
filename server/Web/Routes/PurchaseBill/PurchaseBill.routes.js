module.exports = function(app) {

    var Controller = require('./../../Controller/PurchaseBill/PurchaseBill.controller.js');
    
    app.post('/API/PurchaseBill/PurchaseBill_RefNo_AsyncValidate', Controller.PurchaseBill_RefNo_AsyncValidate);
    
    app.post('/API/PurchaseBill/PurchaseBill_Create', Controller.PurchaseBill_Create);
    app.post('/API/PurchaseBill/PurchaseBill_List', Controller.PurchaseBill_List);
    app.post('/API/PurchaseBill/PurchaseBill_View', Controller.PurchaseBill_View);
    app.post('/API/PurchaseBill/PurchaseBill_UpdateStock', Controller.PurchaseBill_UpdateStock);
    app.post('/API/PurchaseBill/PurchaseBill_YieldUpdate_List', Controller.PurchaseBill_YieldUpdate_List);
    app.post('/API/PurchaseBill/PurchaseBill_Yield_Update', Controller.PurchaseBill_Yield_Update);

 };