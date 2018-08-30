module.exports = function(app) {

   var Controller = require('./../../Controller/Settings/ProductSettings.controller.js');

   app.post('/API/ProductSettings/ProductVariant_SimpleList', Controller.ProductVariant_SimpleList);

   app.post('/API/ProductSettings/ProductUnitOfMeasure_SimpleList', Controller.ProductUnitOfMeasure_SimpleList);

};