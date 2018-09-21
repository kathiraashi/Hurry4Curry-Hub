module.exports = function(app) {

   var Controller = require('./../../Controller/Product/Product.controller.js');

   app.post('/API/Product/ProductGroupName_AsyncValidate', Controller.ProductGroupName_AsyncValidate);
   app.post('/API/Product/Product_Create', Controller.Product_Create);
   app.post('/API/Product/Product_List', Controller.Product_List);
 
};