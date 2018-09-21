module.exports = function(app) {
    var Controller = require('./../../Controller/Stock/Stock.controller.js');

    app.post('/API/Stock/Stock_Create', Controller.Stock_Create);
    app.post('/API/Stock/Stock_List', Controller.Stock_List);
}