var CryptoJS = require("crypto-js");
var HubStockModel = require('./../../Models/Stock/HubStock.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');


// stock create
exports.HubStock_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));   
   
   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else if (!ReceivingData.Product_Id || ReceivingData.Product_Id === '') {
      res.status(400).send({Status: false, Message:"Product Details can not be empty"});
   }else if (!ReceivingData.Quantity || ReceivingData.Quantity === '') {
      res.status(400).send({Status: false, Message: "Quantity Details can not be empty"});
   }else {
      var HubStock = new HubStockModel.HubStockSchema({
         HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
         Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
         Current_Quantity: parseInt(ReceivingData.Quantity),
         UnitOfMeasure: mongoose.Types.ObjectId(ReceivingData.UnitOfMeasure),
         Active_Status: true,
         If_Deleted: false,
      });

      HubStock.save(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Stock Creation Query Error', 'HubStock.controller.js', err);
            res.status(400).send({Status: false, Message: "Some error occurred while creating the Stock!."});
         }else {
            var HubStockHistory = new HubStockModel.HubStockHistorySchema({
               HubProduct_Stock_Id: result._id,
               HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
               Product_Id: mongoose.Types.ObjectId(ReceivingData.Product_Id),
               Previous_Quantity: 0,
               Current_Quantity: parseInt(ReceivingData.Quantity),
               Added_Quantity: parseInt(ReceivingData.Quantity),
               Removed_Quantity: 0,
               History_From: 'Direct_Update',
               UnitOfMeasure: mongoose.Types.ObjectId(ReceivingData.UnitOfMeasure),
               Active_Status: true,
               If_Deleted: false
            });
            HubStockHistory.save(function(err_1, result_1){
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Stock History Create query Error', 'HubStock.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while creating the Hub stock history."});
               }else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};

// stock list
exports.HubStock_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      HubStockModel.HubStockSchema.find({If_Deleted: false, HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id) }, {}, {sort:{updatedAt: -1}})
      .populate({path: 'Product_Id', select: ['Name_withAttribute']})
      .populate({path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Stock List Find Query Error', 'HubStock.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Hub Stock List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// stock history list
exports.HubStock_History_List = function(req, res) {
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if (!ReceivingData.HubStock_Id || ReceivingData.HubStock_Id === ''  ) {
      res.status(400).send({Status: false, Message: "Hub Stock Details can not be empty" });
   }else {
      StockModel.StockHistorySchema.find({If_Deleted: false, HubProduct_Stock_Id: mongoose.Types.ObjectId(HubStock_Id) }, { }, {sort:{Date: -1}})
      .populate({path: 'Product_Id', select: ['Name_withAttribute']})
      .populate({path: 'UnitOfMeasure', select: ['Product_UnitOfMeasure'] })
      .exec(function(err, result) {
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Stock History List Find Query Error', 'HubStock.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Hub Stock History List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};

// stock update
exports.HubStock_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.Stock_Id || ReceivingData.Stock_Id === '') {
      res.status(400).send({Status: false, Message:"Stock Details can not be empty"});
   }else if (!ReceivingData.User_Id || ReceivingData.User_Id === '') {
      res.status(400).send({Status: false, Message: "User Details can not be empty"});
   }else if (!ReceivingData.Quantity || ReceivingData.Quantity === '') {
      res.status(400).send({Status: false, Message: "Quantity Details can not be empty"});
   }else {
         
      HubStockModel.HubStockSchema
      .findOne({'_id': mongoose.Types.ObjectId(ReceivingData.Stock_Id)}, {}, {})
      .exec(function(err, result){
         if(err) {
         ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Stock Data Find Query Error', 'HubStock.controller.js', err);
         res.status(417).send({status: false, Message: "Some error occurred while Find The Hub Stock Data!."});
         }
         else {
            var Previous_Quantity = result.Current_Quantity;
            result.Current_Quantity = parseInt(result.Current_Quantity) + parseInt(ReceivingData.Quantity);
            result.save(function(err_1, result_1) {
               if(err) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Stock Update Query Error', 'HubStock.controller.js', err_1);
                  res.status(400).send({Status: false, Message: "Some error occurred while Updated the Hub Stock Details!."});
               } else {
                  var HubStockHistory = new HubStockModel.HubStockHistorySchema({
                     HubProduct_Stock_Id: result._id,
                     HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                     Product_Id: mongoose.Types.ObjectId(result.Product_Id),
                     Previous_Quantity: Previous_Quantity,
                     Added_Quantity: parseInt(ReceivingData.Quantity),
                     Current_Quantity: result_1.Current_Quantity,
                     UnitOfMeasure: mongoose.Types.ObjectId(ReceivingData.UnitOfMeasure),
                     Removed_Quantity: 0,
                     History_From: 'Direct_Update',
                     Active_Status: true,
                     If_Deleted: false
                  });
                  HubStockHistory.save(function(err_2, result_2){
                     if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Hub Stock History creating query Error', 'HubStock.controller.js', err_2);
                           res.status(400).send({Status: false, Message: "Some error occurred while creating the hub stock history."});
                     }else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                           ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                     }
                  });
               }
            });
         }
      });
   }
}
