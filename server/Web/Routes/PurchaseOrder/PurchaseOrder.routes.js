module.exports = function(app) {

    var Controller = require('./../../Controller/PurchaseOrder/FranchiseePurchaseOrder.controller.js');

    app.post('/API/FranchiseePurchaseOrder/FranchiseePurchaseOrder_List', Controller.FranchiseePurchaseOrder_List);
    app.post('/API/FranchiseePurchaseOrder/FranchiseePurchaseOrder_View', Controller.FranchiseePurchaseOrder_View);
    app.post('/API/FranchiseePurchaseOrder/FranchiseePurchaseOrder_CreateDeliver', Controller.FranchiseePurchaseOrder_CreateDeliver);
};