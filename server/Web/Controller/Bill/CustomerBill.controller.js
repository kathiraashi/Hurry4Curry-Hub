var CryptoJS = require("crypto-js");
var HubCustomerBillModel = require('./../../Models/Bill/CustomerBill.model.js');
var HubStockModel = require('./../../Models/Stock/HubStock.model');
var HubCashRegisterModel = require('./../../Models/Accounts/CashRegister.model.js');
var HubBankRegisterModel = require('./../../Models/Accounts/BankRegister.model.js');
// var HubAccountSettingsModel = require('./../../Models/Settings/AccountSettings.model.js');
var ErrorManagement = require('./../../../Handling/ErrorHandling.js');
var mongoose = require('mongoose');

// create bill
exports.CustomerBill_Create = function(req, res) {
   var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
   var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   console.log(ReceivingData);

   if(!ReceivingData.User_Id || ReceivingData.User_Id === '' ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   } else if(!ReceivingData.Customer || ReceivingData.Customer === '' ) {
      res.status(400).send({Status: false, Message: "Customer Name can not be empty" });
   }else if(!ReceivingData.BillDate || ReceivingData.BillDate === '' ) {
      res.status(400).send({Status: false, Message: "Bill date can not be empty" });
   } else{
      HubCustomerBillModel.HubCustomer_BillSchema.find({},{Bill_Number_Length: 1},{sort:{Bill_Number_Length: -1}, limit: 1})
         .exec(function(BillErr, BillResult){
             if(BillErr){
                ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill Creation Query Error', 'CustomerBill.controller.js', BillErr);
                res.status(400).send({Status: false, Message: "Some error occurred while creating the Bill!."});
             }
             else {
                 var number = 1;
                 if(BillResult.length > 0){
                     number = BillResult[0].Bill_Number_Length + 1;
                 }
                 const Bill_Last_Number = number.toString().padStart(4, 0);
                 const BillNumber = "BILL" + Bill_Last_Number;

                 var Bill = new HubCustomerBillModel.HubCustomer_BillSchema({
                    Customer_Id: mongoose.Types.ObjectId(ReceivingData.Customer),
                    Bill_Number: BillNumber,
                    Bill_Number_Length: Bill_Last_Number,
                    Bill_Date: ReceivingData.BillDate,
                    Net_Amount: ReceivingData.Net_Amount,
                    Payment_Method: ReceivingData.PaymentType,
                    Reference_Number: ReceivingData.ReferenceNumber,
                    Created_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Last_Modified_By : mongoose.Types.ObjectId(ReceivingData.User_Id),
                    Date: ReceivingData.Date,
                    If_Deleted: false,
                    Active_Status : ReceivingData.Active_Status || true,
                });
                Bill.save(function(err, result) {
                   if(err) {
                      ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill Creation Query Error', 'CustomerBill.controller.js', err);
                      res.status(400).send({Status: false, Message: "Some error occurred while creating the Bill!."});
                   } else {
                     const itemArray = ReceivingData.items.map(obj => {
                                          const newObj = {
                                             CustomerBill_Id: result._id,
                                             Product_Id: mongoose.Types.ObjectId(obj.Product.Product_Id._id),
                                             Price: obj.Price,
                                             Quantity: obj.Quantity,
                                             Product_Total: obj.Product_Total,
                                             UnitOfMeasure: mongoose.Types.ObjectId(obj.UnitOfMeasure),
                                             Active_Status: true,
                                             If_Deleted: false
                                          };             
                                          return newObj;
                                       });
                     HubCustomerBillModel.HubCustomerBill_ProductSchema.collection.insert(itemArray, function(err_1, result_1){
                        if(err_1) {
                           ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'bill Product Creation Query Error', 'CustomerBill.controller.js', err_1);
                           res.status(400).send({Status: false, Message: "Some error occurred while creating the bill Product Insert!."});
                        } else {
                           const List = ReceivingData.items;
                           
                           const UpdateStock = (List) => Promise.all(
                              List.map( obj => UpdateAll(obj) )
                           ).then(response => {

                              
                              // ************************* Payment Update Start ***************
                        //       if (ReceivingData.PaymentType === 'Bank') {
                        //          HubBankRegisterModel.Hub_BankRegisterSchema.find(
                        //  { Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id), If_Deleted: false },
                        //             { Available_Amount: 1 },
                        //             { sort: { createdAt: -1 }, length: 1 } 
                        //          ).exec(function(PayErr, PayResult) {
                        //             if (!PayErr) {
                        //                var Available_Amount = 0;
                        //                if (PayResult.length > 0) {
                        //                   Available_Amount = PayResult[0].Available_Amount + ReceivingData.Net_Amount;
                        //                }
                        //                HubAccountSettingsModel.BanksSchema.findOne(
                        //                   { Creator_Type: 'Hub', Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id), If_Deleted: false, If_Default: true  }, {}, {} 
                        //                ).exec(function(PayErr_1, PayResult_1) {
                        //                   var Bank = null;
                        //                   if (result_1 !== null) {
                        //                      Bank = PayResult_1._id;
                        //                   }
                        //                   var BankRegister = new HubBankRegisterModel.Hub_BankRegisterSchema({
                        //                      Bank: Bank,
                        //                      Amount: ReceivingData.Net_Amount,
                        //                      Date: new Date() ,
                        //                      Type: 'Credit',
                        //                      Reference_Id: result._id,
                        //                      Reference_Type: 'CustomerBill_Credit',
                        //                      Available_Amount: Available_Amount,
                        //                      Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                        //                      Active_Status:  true,
                        //                      If_Deleted: false
                        //                   });
                        //                   BankRegister.save(function(PayErr_1, PayResult_1) {
                        //                      if (!PayErr_1) {
                        //                         var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                        //                         ReturnData = ReturnData.toString();
                        //                         res.status(200).send({Status: true, Message: 'New Bill Successfully Created' }); 
                        //                      }
                        //                   });
                        //                });
                        //             }
                        //          });
                        //       } else if(ReceivingData.PaymentType === 'Cash') {
                        //          HubCashRegisterModel.Hub_CashRegisterSchema.find(
                        //             { Created_By:mongoose.Types.ObjectId(ReceivingData.User_Id), If_Deleted: false },
                        //             { Available_Amount: 1 },
                        //             { sort: { createdAt: -1 }, length: 1 } 
                        //          ).exec(function(PayErr, PayResult) {
                        //             if (!PayErr) {
                        //                var Available_Amount = ReceivingData.Net_Amount;
                        //                if (PayResult.length > 0) {
                        //                   Available_Amount = PayResult[0].Available_Amount + ReceivingData.Net_Amount;
                        //                }
                        //                var CashRegister = new HubCashRegisterModel.Hub_CashRegisterSchema({
                        //                   Amount: ReceivingData.Net_Amount,
                        //                   Date:  new Date(),
                        //                   Type: 'Credit',
                        //                   Reference_Id: result._id,
                        //                   Reference_Type: 'CustomerBill_Credit',
                        //                   Available_Amount: Available_Amount, 
                        //                   Created_By: mongoose.Types.ObjectId(ReceivingData.User_Id),
                        //                   Active_Status: true,
                        //                   If_Deleted: false
                        //                });
                        //                CashRegister.save(function(PayErr_1, PayResult_1) {
                        //                   if (!PayErr_1) {
                        //                      var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
                        //                      ReturnData = ReturnData.toString();
                        //                      res.status(200).send({Status: true, Message: 'New Bill Successfully Created' }); 
                        //                   }
                        //                });
                        //             }
                        //          });
                        //       }           
                              // ************************* Payment Update End ***************

                             
                           });

                           const UpdateAll = (info) => Promise.all([
                              HubStockModel.HubStockSchema.update(
                                    { _id: info.Product._id }, 
                                    { $set: {Current_Quantity: parseInt(info.Product.Current_Quantity) - parseInt(info.Quantity) }}
                              ),
                              HubStockModel.HubStockHistorySchema.create([{
                                 HubProduct_Stock_Id: info.Product._id,
                                 HubUser_Id: mongoose.Types.ObjectId(ReceivingData.User_Id), 
                                 Product_Id: mongoose.Types.ObjectId(info.Product.Product_Id._id),
                                 Previous_Quantity: parseInt(info.Product.Current_Quantity),
                                 Current_Quantity: parseInt(info.Product.Current_Quantity) - parseInt(info.Quantity),
                                 Removed_Quantity: parseInt(info.Quantity),
                                 Added_Quantity: 0,
                                 UnitOfMeasure: mongoose.Types.ObjectId(info.Product.UnitOfMeasure._id),
                                 Reference_Id: mongoose.Types.ObjectId(result._id), // Customer Bill Id
                                 History_From: 'Customer_Bill',
                                 Active_Status: true,
                                 If_Deleted: false
                              }])
                           ]).then(response => {
                              return response;
                           });
                           UpdateStock(List);
                        }
                     });
                   }
                });
             }
         });
         
     }
};

//Bill List
exports.CustomerBill_List = function(req, res){
    var CryptoBytes  = CryptoJS.AES.decrypt(req.body.Info, 'SecretKeyIn@123');
    var ReceivingData = JSON.parse(CryptoBytes.toString(CryptoJS.enc.Utf8));

   if (!ReceivingData.User_Id || ReceivingData.User_Id === ''  ) {
      res.status(400).send({Status: false, Message: "User Details can not be empty" });
   }else{
      HubCustomerBillModel.HubCustomer_BillSchema
      .find({ If_Deleted: false, Created_By:mongoose.Types.ObjectId(ReceivingData.User_Id)}, {}, {})
      .populate({path: 'Customer_Id', select:['Name', 'Phone']})
      .populate({path: 'Created_By', select:['Name']})
      .exec(function(err, result){
         if(err) {
            ErrorManagement.ErrorHandling.ErrorLogCreation(req, 'Bill List Find Query Error', 'CustomerBill.controller.js', err);
            res.status(417).send({status: false, Message: "Some error occurred while Find The Bill List!."});
         } else {
            var ReturnData = CryptoJS.AES.encrypt(JSON.stringify(result), 'SecretKeyOut@123');
            ReturnData = ReturnData.toString();
            res.status(200).send({Status: true, Response: ReturnData });
         }
      });
   }
};