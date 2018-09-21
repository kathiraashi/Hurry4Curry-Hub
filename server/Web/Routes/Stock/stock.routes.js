module.exports = function(app) {
    var Controller = require('./../../Controller/Stock/Stock.controller.js');

    app.post('/API/Stock/Stock_Create', Controller.Stock_Create);
    app.post('/API/Stock/Stock_List', Controller.Stock_List);
    app.post('/API/Stock/Stock_History_List', Controller.Stock_History_List);
    app.post('/ApI/Stock/Stock_Update', Controller.Stock_Update);
}