var CryptoJS = require("crypto-js");
var LogExpensesModel = require('./../../Models/Accounts/LogExpenses.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');




// LogExpenses Create
exports.LogExpenses_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.Expenses_Type || ReceivingData.Expenses_Type === '' ) {
      res.status(400).send({Status: false, Message: "Expenses Type can not be empty" });
   }else if(!ReceivingData.Expenses || ReceivingData.Expenses === '' ) {
      res.status(400).send({Status: false, Message: "Expenses can not be empty" });
   }else if(!ReceivingData.Date || ReceivingData.Date === '' ) {
      res.status(400).send({Status: false, Message: "Date can not be empty" });
   }else if(!ReceivingData.Amount || ReceivingData.Amount === '' ) {
      res.status(400).send({Status: false, Message: "Amount can not be empty" });
   } else if (!ReceivingData.Created_By || ReceivingData.Created_By === ''  ) {
      res.status(400).send({Status: false, Message: "Creator Details can not be empty" });
   }else {
      var Create_LogExpenses = new LogExpensesModel.HubLogExpensesSchema({
         Expenses_Type: mongoose.Types.ObjectId(ReceivingData.Expenses_Type),
         Expenses: ReceivingData.Expenses,
         Date: ReceivingData.Date,
         Amount: ReceivingData.Amount,
         Current_Status: 'Waiting For Approval',
         Status_Position: 'Stage_1',
         Created_By: mongoose.Types.ObjectId(ReceivingData.Created_By),
         Active_Status: true,
         If_Deleted: false
      });
      Create_LogExpenses.save(function(err, result) { // Log Expenses Save Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Log Expenses Creation Query Error', 'LogExpenses.controller.js');
            res.status(417).send({Status: false, Message: "Some error occurred while creating the Log Expenses!."});
         } else {
            LogExpensesModel.HubLogExpensesSchema
               .findOne({'_id': result._id})
               .populate({ path: 'Expenses_Type', select: ['Expense_Type'] })
               .populate({ path: 'Created_By', select: ['Name'] })
               .exec(function(err_1, result_1) { // Log Expenses FindOne Query
               if(err_1) {
                  ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Log Expenses Find Query Error', 'LogExpenses.controller.js', err_1);
                  res.status(417).send({status: false, Message: "Some error occurred while Find The Log Expenses!."});
               } else {
                  var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_1), 'SecretKeyOut@123');
                  ReturnData = ReturnData.toString();
                  res.status(200).send({Status: true, Response: ReturnData });
               }
            });
         }
      });
   }
};


// LogExpenses List
exports.LogExpenses_List = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      LogExpensesModel.HubLogExpensesSchema
         .find({ Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id), 'If_Deleted': false }, {}, {sort: { updatedAt: -1 }})
         .populate({ path: 'Created_By', select: ['Name'] })
         .populate({ path: 'Expenses_Type', select: ['Expense_Type'] })
         .exec(function(err, result) { // LogExpenses FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Log Expenses Find Query Error', 'LogExpenses.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Log Expenses!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};


// LogExpenses Update
exports.LogExpenses_Update = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if(!ReceivingData.LogExpenses_Id || ReceivingData.LogExpenses_Id === '' ) {
      res.status(400).send({Status: false, Message: "Expense Type Details can not be empty" });
   } else if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else {
      LogExpensesModel.HubLogExpensesSchema.findOne({'_id': mongoose.Types.ObjectId(ReceivingData.LogExpenses_Id)}, {}, {}, function(err, result) { // Log Expenses FindOne Query
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Log Expenses FindOne Query Error', 'LogExpenses.controller.js', err);
            res.status(417).send({status: false, Error:err, Message: "Some error occurred while Find The Log Expenses!."});
         } else {
            if (result !== null) {
               result.Current_Status = 'Completed';
               result.Status_Position = 'Stage_2';
               result.Status_UpdatedDate = new Date();
               result.save(function(err_1, result_1) { // Log Expenses Update Query
                  if(err_1) {
                     ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Log Expenses Update Query Error', 'LogExpenses.controller.js');
                     res.status(417).send({Status: false, Error: err_1, Message: "Some error occurred while Update the Log Expenses!."});
                  } else {
                     LogExpensesModel.HubLogExpensesSchema
                        .findOne({'_id': result_1._id})
                        .populate({ path: 'Created_By', select: ['Name'] })
                        .populate({ path: 'Expenses_Type', select: ['Expenses_Type'] })
                        .exec(function(err_2, result_2) { // Log Expenses FindOne Query
                        if(err_2) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Log Expenses Find Query Error', 'LogExpenses.controller.js', err_2);
                           res.status(417).send({status: false, Message: "Some error occurred while Find The Log Expenses!."});
                        } else {
                           var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result_2), 'SecretKeyOut@123');
                              ReturnData = ReturnData.toString();
                           res.status(200).send({Status: true, Response: ReturnData });
                        }
                     });
                  }
               });
            } else {
               res.status(400).send({Status: false, Message: "Log Expenses Details can not be valid!" });
            }
         }
      });
   }
};