module.exports = function(app) {

    var Controller = require('./../../Controller/PurchaseBill/HubPurchaseBill.controller.js');
    
    app.post('/API/HubPurchaseBill/HubPurchaseBill_RefNo_AsyncValidate', Controller.HubPurchaseBill_RefNo_AsyncValidate);
    
    app.post('/API/HubPurchaseBill/HubPurchaseBill_Create', Controller.HubPurchaseBill_Create);
    app.post('/API/HubPurchaseBill/HubPurchaseBill_List', Controller.HubPurchaseBill_List);
    app.post('/API/HubPurchaseBill/HubPurchaseBill_View', Controller.HubPurchaseBill_View);
    app.post('/API/HubPurchaseBill/HubPurchaseBill_Received', Controller.HubPurchaseBill_Received);
    app.post('/API/HubPurchaseBill/HubPurchaseBill_YieldUpdate_List', Controller.HubPurchaseBill_YieldUpdate_List);
    app.post('/API/HubPurchaseBill/HubPurchaseBill_Yield_Update', Controller.HubPurchaseBill_Yield_Update);

 };