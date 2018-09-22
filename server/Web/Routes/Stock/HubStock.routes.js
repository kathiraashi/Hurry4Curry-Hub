module.exports = function(app) {
    var Controller = require('./../../Controller/Stock/HubStock.controller.js');

    app.post('/API/HubStock/HubStock_Create', Controller.HubStock_Create);
    app.post('/API/HubStock/HubStock_List', Controller.HubStock_List);
    app.post('/API/HubStock/HubStock_History_List', Controller.HubStock_History_List);
    app.post('/ApI/HubStock/HubStock_Update', Controller.HubStock_Update);
}