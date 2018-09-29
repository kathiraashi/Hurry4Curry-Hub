module.exports = function(app) {

    var Controller = require('./../../Controller/DeliverProducts/DeliverProducts.controller.js');

    app.post('/API/DeliverProducts/DeliverProducts_List', Controller.DeliverProducts_List);
    app.post('/API/DeliverProducts/DeliverProducts_View', Controller.DeliverProducts_View);
    app.post('/API/DeliverProducts/DeliverProducts_Deliver', Controller.DeliverProducts_Deliver);
};