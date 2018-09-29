var CryptoJS = require("crypto-js");
var CashRegisterModel = require('./../../Models/Accounts/CashRegister.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');



exports.CashRegister_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      CashRegisterModel.Hub_CashRegisterSchema
         .find({ Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id), 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .exec(function(err, result) { // CashRegisters Find Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Cash Registers List Find Query Error', 'CashRegister.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Cash Registers List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};
