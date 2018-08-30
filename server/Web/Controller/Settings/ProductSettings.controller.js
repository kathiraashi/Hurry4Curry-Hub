var CryptoJS = require("crypto-js");
var SettingsModel = require('./../../models/Settings/Settings.model.js');
var ErrorManagement = require('./../../../handling/ErrorHandling.js');
var mongoose = require('mongoose');




// Product Variant Simple List
   exports.ProductVariant_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductVariantsSchema.find({'If_Deleted': false }, { Product_Variant : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Product Variant FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product Variant Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product Variant!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };







// Product UnitOfMeasure Simple List
   exports.ProductUnitOfMeasure_SimpleList = function(req, res) {
      var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
      var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

      if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
         res.status(400).send({Status: false, Message: "User Details can not be empty" });
      }else {
         SettingsModel.ProductUnitOfMeasuresSchema.find({'If_Deleted': false }, { Product_UnitOfMeasure : 1 }, {sort: { updatedAt: -1 }}, function(err, result) { // Product UnitOfMeasure FindOne Query
            if(err) {
               ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Product UnitOfMeasure Find Query Error', 'ProductSettings.controller.js', err);
               res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Product UnitOfMeasure!."});
            } else {
               var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
               ReturnData = ReturnData.toString();
               res.status(200).send({Status: true, Response: ReturnData });
            }
         });
      }
   };